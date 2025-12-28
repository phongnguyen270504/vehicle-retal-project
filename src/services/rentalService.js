const Car= require('../models/Car');
const Rental= require('../models/Rental');
const {sequelize}= require('../models/db');
const { Op }= require('sequelize');

const getRentals= async (options={})=>{
    const where={};
    if(options.userId){
        where.user_id= options.userId;
    }
    if(options.status){
        where.status= options.status;
    }
    if(options.car_id){
        where.car_id= options.car_id;
    }
    const rentals= await Rental.findAll(
        {
            where,
            include:[
                {
                    model:Car,
                    attributes:['name','price_per_day','status'],
                }]
        }
    );
    return rentals.map(
        r=>({
            id: r.id,
            startDate: r.start_date,
            endDate: r.end_date,
            totalPrice: r.total_price,
            status: r.status,
            car:{
                id: r.Car.id,
                name: r.Car.name,
                pricePerDay: r.Car.price_per_day,
            }
        })
    );
}

const getRentalById= async (rentalId)=>{

    const rental= await Rental.findByPk(rentalId,{
        include:[{
            model: Car,
            attributes:['name','price_per_day','status'],
        }]
    });

    if(!rental){
        const err= new Error('Đơn thuê không tồn tại');
        err.statusCode=404;
        throw err;
    }

    return rental;
}
const confirmRental= async(rentalId)=>{

    const transaction= await sequelize.transaction();
    try {
        const rental= await Rental.findByPk(rentalId,
        {include:[{
            model: Car
        }],
        transaction,
        lock: transaction.LOCK.UPDATE}
            );
        if(!rental){
            const err= new Error('Đơn thuê không tồn tại');
            err.statusCode=404;
            throw err;
        }

         if(rental.status !=='pending'){
                const err= new Error('Đơn thuê không ở trạng thái chờ duyệt');
                err.statusCode=400;
                throw err;
            }

        if( rental.Car.status ==='maintenance'){
            const err= new Error('Xe không khả dụng để thuê');
            err.statusCode=400;
            throw err;
        }

        const conflict= await Rental.findOne({
            where:{
                car_id: rental.car_id,
                status: 'active',
                [Op.and]: [
                    {
                        start_date: { [Op.lte]: rental.end_date }
                    },
                    {
                        end_date: { [Op.gte]: rental.start_date }
                    }
                ]},
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if(conflict){
            const err= new Error('Xe đã được thuê trong khoảng thời gian này');
            err.statusCode=400;
            throw err;
        }

        rental.status='active';
        await rental.save({transaction});
        rental.Car.status='rented';
        await rental.Car.save({transaction});

        await transaction.commit();
        return {
            message:'Xác nhận đơn thuê thành công',
            rental_id: rental.id,
        };
    } catch (err) {
        transaction.rollback();
        throw err;
    }
}

const rentalCancel= async(rentalId,userId)=>{
    const rental= await Rental.findByPk(rentalId);
    if(!rental){
        const err= new Error('Đơn thuê không tồn tại');
        err.statusCode=404;
        throw err;
    }
    if(rental.user_id !== userId){
        const err= new Error('Bạn chỉ có thể hủy đơn thuê của chính mình');
        err.statusCode=403;
        throw err;
    }

    if(rental.status !=='pending'){
        const err= new Error('Không thể hủy đơn thuê không ở trạng thái chờ duyệt');
        err.statusCode=400;
        throw err;
    }

    rental.status='cancelled';
    await rental.save();

    return {
        message:'Hủy đơn thuê thành công',
        rental_id: rental.id,
    };

}

const rentalComplete= async(rentalId,userId)=>{
    const rental= await Rental.findByPk(rentalId);
    if(!rental){
        const err= new Error('Đơn thuê không tồn tại');
        err.statusCode=404;
        throw err;
    }
    if(rental.user_id !== userId){
        const err= new Error('Không có quyền hoàn tất đơn này');
        err.statusCode=403;
        throw err;
    }
    if(rental.status !=='active'){
        const err= new Error('Chỉ có thể hoàn tất đơn thuê ở trạng thái đang hoạt động');
        err.statusCode=400;
        throw err;
    }
    rental.status='completed';
    await rental.save();

    Car.update(
        {status:'available'},
        {where:{id:rental.car_id}}
    );

    return {
        message:'Hoàn tất đơn thuê thành công',
        rental_id: rental.id,
    };
}

const rentalCreate=async(userId,data)=>{
    const {car_id,start_date,end_date}= data;

    const car= await Car.findByPk(car_id);
    if(!car)
    {
        const err= new Error('Xe không tồn tại');
        err.statusCode=404;
        throw err;
    }

    if(car.status ==='maintenance')
    {
        const err= new Error('Xe không khả dụng để thuê');
        err.statusCode=400;
        throw err;
    }
    const start= new Date(start_date);
    const end= new Date(end_date);
    const days= Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    if(days <=0)
    {
        const err= new Error('Ngày thuê không hợp lệ');
        err.statusCode=400;
        throw err;
    }
    const total_price= days * Number(car.price_per_day);

   const rental= await Rental.create({
        user_id: userId,
        car_id,
        start_date,
        end_date,
        total_price,
        status:'pending'
   })

    return rental;
}

module.exports={rentalCreate, getRentals, getRentalById, confirmRental, rentalCancel, rentalComplete};