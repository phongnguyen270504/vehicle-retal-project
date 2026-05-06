const Car = require("../models/Car");
// const Brand= require("../models/Brand");
// const CarType= require("../models/CarType");
const {Op, NUMBER}= require("sequelize");

const getAllCars= async (query)=>{
        const whereCar={};
        const whereBrand={};
        const whereType={};

        const page= Math.max(Number(query.page) || 1, 1);
        const limit= Math.min(Number(query.limit) || 10, 20);
        const offset= (page-1)*limit;

        if(query.name?.trim())
        {
            whereCar.name={ [Op.like]: `%${query.name.trim()}%`};
        }

        if(query.brand?.trim()){

            whereBrand.name=query.brand.trim();
        }

        if(query.type?.trim())
        {
            whereType.name=query.type.trim();
        }

        if (query.status) 
        {
            whereCar.status = query.status;
        }

        if (query.minPrice || query.maxPrice) {
            whereCar.price_per_day = {};

            if (query.minPrice) {
                whereCar.price_per_day[Op.gte] = Number(query.minPrice);
            }

            if (query.maxPrice) {
                whereCar.price_per_day[Op.lte] = Number(query.maxPrice);
            }
        }

        const {count, rows}= await Car.findAndCountAll(
            { 
                where: whereCar,
                attributes:['id', 'name', 'price_per_day', 'status', 'brand', 'type'],
                limit: limit,
                offset: offset,
                distinct: true,
                order: [['id', 'DESC']]
            }
        );

        const result= rows.map(c=>({
            id: c.id,
            name: c.name,
            pricePerDay: c.price_per_day,
            status: c.status,
            brand: c.brand ?? null,
            type: c.type ?? null
        }))

        return {
            totalItems: count,
            totalPages: Math.ceil(count/limit),
            currentPage: page,
            cars: result
        };
}

const getCarById= async (id)=>{
        const car = await Car.findByPk(id,{
            attributes:['id', 'name', 'price_per_day', 'status', 'brand', 'type'],
        });
        if(!car){
            const err= new Error("Không tìm thấy xe");
            err.statusCode=404;
            throw err;
        }
        const result={
            id: car.id,
            name: car.name,
            pricePerDay: car.price_per_day,
            status: car.status,
            brand: car.brand ?? null,
            type: car.type ?? null
        }
        return result;
}

const createCar = async (data)=>{
    const {name, brand, type, price_per_day,}= data

    if(!name || !brand || !type || !price_per_day)
    {
        const err = new Error('Thiếu dữ liệu bắt buộc');
        err.statusCode = 400;
        throw err;
    }

    // const brandId= Number(brand_id);
    // if (isNaN(brandId) || brandId <= 0) {
    //     const err = new Error('Brand ID không hợp lệ');
    //     err.statusCode = 400;
    //     throw err;
    // }

    // const brand = await Brand.findByPk(brandId);
    // if (!brand) {
    //     const err = new Error('Brand không tồn tại');
    //     err.statusCode = 400;
    //     throw err;
    // }

    // const typeId= Number(type_id);
    // if (isNaN(typeId) || typeId <= 0) {
    //     const err = new Error('Car type ID không hợp lệ');
    //     err.statusCode = 400;
    //     throw err;
    // }
    
    // const type = await CarType.findByPk(typeId);
    // if (!type) {
    //     const err = new Error('Car type không tồn tại');
    //     err.statusCode = 400;
    //     throw err;
    // }

    const price = Number(price_per_day);

    if (isNaN(price) || price <= 0) {
        const err = new Error('Giá thuê không hợp lệ');
        err.statusCode = 400;
        throw err;
    }

    const car= await Car.create({
        name,
        brand,
        type,
        price_per_day,
        status: "available"
    })

    return ({
        id: car.id,
        name: car.name,
        pricePerDay: Number(car.price_per_day),
        status: car.status,
        brand: car.brand,
        type: car.type
    })
}

const updateCar= async (id,data)=>{
    const car= await Car.findByPk(id);
    if(!car){
        const err = new Error('Không tìm thấy xe');
        err.statusCode = 404;
        throw err;
    }
    if('name' in data && !data.name.trim())
    {
          const err = new Error('Tên xe không được để trống');
          err.statusCode = 400;
          throw err;
    }

    if('price_per_day' in data && Number(data.price_per_day) <=0)
    {
        const err = new Error('Giá xe không hợp lệ');
        err.statusCode = 400;
        throw err;
    }
    // if('brand_id' in data){
    //     const brandId= Number(data.brand_id);
    //     if (isNaN(brandId) || brandId <= 0) {
    //         const err = new Error('Brand ID không hợp lệ');
    //         err.statusCode = 400;
    //         throw err;
    //     }
    //     const brand = await Brand.findByPk(brandId);
    //     if (!brand) {
    //         const err = new Error('Brand không tồn tại');
    //         err.statusCode = 400;
    //         throw err;
    //     }
    // }
    // if('type_id' in data){
    //     const typeId= Number(data.type_id);
    //     if (isNaN(typeId) || typeId <= 0) {
    //         const err = new Error('Car type ID không hợp lệ');
    //         err.statusCode = 400;
    //         throw err;
    //     }
    //     const type = await CarType.findByPk(typeId);
    //     if (!type) {
    //         const err = new Error('Car type không tồn tại');
    //         err.statusCode = 400;
    //         throw err;
    //     }
    // }
    await car.update({
        name: data.name ?? car.name,
        price_per_day: data.price_per_day !== undefined ? Number(data.price_per_day) : car.price_per_day,
        status: data.status ?? car.status,
        brand: data.brand ?? car.brand,
        type: data.type ?? car.type
    })

    const updatedCar = await Car.findByPk(id, {
            attributes: ['id', 'name', 'price_per_day', 'status', 'brand', 'type'],
        });
    return ({
            id: updatedCar.id,
            name: updatedCar.name,
            pricePerDay: updatedCar.price_per_day,
            status: updatedCar.status,
            brand: updatedCar.brand,
            type: updatedCar.type
        });
}

const deleteCar=async (id)=>{
    const car= await Car.findByPk(id);

    if (!car) {
        const err = new Error('Không tìm thấy xe');
        err.statusCode = 404;
        throw err;
    }

    await car.destroy();
}

module.exports={getAllCars,getCarById,createCar,updateCar,deleteCar};