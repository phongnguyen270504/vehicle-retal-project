const carService= require('../../services/carService');
const rentalService= require('../../services/rentalService');
const indexPage= async (req,res)=>{
    try {
        const results = await carService.getAllCars(req.query);
        res.render('cars/index.ejs',{
            title: 'Danh sách xe',
            results
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}
const getCarById= async (req,res) =>{
    try {
        const id= Number(req.params.id);
        const car = await carService.getCarById(id);
        res.render('cars/detail.ejs',{
            result: car
        });
    } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({
        message: err.message || 'Server error'
        });
    }
}

const bookingCarPage= async (req,res)=>{
    try {
        const id= Number(req.params.id);
        const car = await carService.getCarById(id);
        res.render('cars/booking-page.ejs',{
            result: car
        });
    } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({
            message: err.message || 'Server error'
        });
    }
}




module.exports={indexPage, getCarById, bookingCarPage,
};