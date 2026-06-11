const carService = require('../../services/carService');
const rentalService = require('../../services/rentalService');
const dashboardPage = (req, res) => {
    try {
        res.render('admin/dashboard.ejs', {
            title: 'Admin Dashboard'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const manageCarsPage = async (req, res) => {
    try {
        
        const results = await carService.getAllCars(req.query);
        res.render('admin/manage-cars.ejs', {
            title: 'Quản lý xe',
            cars: results.cars,
            totalPages: results.totalPages,
            currentPage: results.currentPage,
        });
     } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const manageRentalsPage= async (req, res) => {
   try {
        const results = await rentalService.getRentals(req.query);
        res.render('admin/manage-rentals.ejs',{
            title: 'Quản lý đơn thuê',
            rentals: results.rentals,
            totalPages: results.totalPages,
            currentPage: results.currentPage
        });
   } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
   }
}

module.exports = {dashboardPage, manageCarsPage, manageRentalsPage};