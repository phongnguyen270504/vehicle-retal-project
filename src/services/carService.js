const Car = require("../models/Car");
const Brand= require("../models/Brand");
const CarType= require("../models/CarType");
const {Op}= require("sequelize");

const getAllCars= async (query)=>{
        const where={};

        if(query.brand){
            where.brand_id=query.brand;
        }

        if(query.type)
        {
            where.type_id=query.type;
        }

        if (query.status) 
        {
            where.status = query.status;
        }

        if (query.minPrice || query.maxPrice) {
            where.price_per_day = {};

            if (query.minPrice) {
                where.price_per_day[Op.gte] = Number(query.minPrice);
            }

            if (query.maxPrice) {
                where.price_per_day[Op.lte] = Number(query.maxPrice);
            }
        }

        const cars= await Car.findAll(
            { 
                where,
                attributes:['id', 'name', 'price_per_day', 'status'],
                include:
                [{model:Brand,
                    attributes:['name']
                },
                  {
                    model:CarType,
                    attributes:['name']
                  },
                ]}
        );

        const result= cars.map(c=>({
            id: c.id,
            name: c.name,
            pricePerDay: c.price_per_day,
            status: c.status,
            brand: c.Brand.name,
            type: c.CarType.name
        }))

        return result;
}

const getCarById= async (id)=>{
        const car = await Car.findByPk(id,{
            attributes:['id', 'name', 'price_per_day', 'status'],
            include:[{model:Brand,
                    attributes:['name']
                },
                  {
                    model:CarType,
                    attributes:['name']
                  },
            ]
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
            brand: car.Brand.name,
            type: car.CarType.name
        }
        return result;
}

const createCar = async (data)=>{
    const {name, brand_id, type_id, price_per_day}= data

    if(!name || !brand_id || !type_id || !price_per_day)
    {
        const err = new Error('Thiếu dữ liệu bắt buộc');
        err.statusCode = 400;
        throw err;
    }

    const brandId= Number(brand_id);
    if (isNaN(brandId) || brandId <= 0) {
        const err = new Error('Brand ID không hợp lệ');
        err.statusCode = 400;
        throw err;
    }

    const brand = await Brand.findByPk(brandId);
    if (!brand) {
        const err = new Error('Brand không tồn tại');
        err.statusCode = 400;
        throw err;
    }

    const typeId= Number(type_id);
    if (isNaN(typeId) || typeId <= 0) {
        const err = new Error('Car type ID không hợp lệ');
        err.statusCode = 400;
        throw err;
    }
    
    const type = await CarType.findByPk(typeId);
    if (!type) {
        const err = new Error('Car type không tồn tại');
        err.statusCode = 400;
        throw err;
    }

    const price = Number(price_per_day);

    if (isNaN(price) || price <= 0) {
        const err = new Error('Giá thuê không hợp lệ');
        err.statusCode = 400;
        throw err;
    }

    const car= await Car.create({
        name,
        brand_id: brandId,
        type_id: typeId,
        price_per_day,
        status: "available"
    })

    return ({
        id: car.id,
        name: car.name,
        pricePerDay: Number(car.price_per_day),
        status: car.status,
        brand: brand.name,
        type: type.name
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
    await car.update({
        name: data.name ?? car.name,
        price_per_day: data.price_per_day ?? car.price_per_day,
        status: data.status ?? car.status,
        brand_id: data.brand_id ?? car.brand_id,
        type_id: data.type_id ?? car.type_id
    })

    const updatedCar = await Car.findByPk(id, {
            attributes: ['id', 'name', 'price_per_day', 'status'],
            include: [
            { model: Brand, attributes: ['name'] },
            { model: CarType, attributes: ['name'] }
            ]
        });
    return ({
            id: updatedCar.id,
            name: updatedCar.name,
            pricePerDay: updatedCar.price_per_day,
            status: updatedCar.status,
            brand: updatedCar.Brand.name,
            type: updatedCar.CarType.name
        });
}

const deleteCar=async (id)=>{
    const car= await Car.findByPk(id);

    if (!car) {
        const err = new Error('Không tìm thấy xe');
        err.statusCode = 404;
        throw err;
    }

    car.destroy();
}

module.exports={getAllCars,getCarById,createCar,updateCar,deleteCar};