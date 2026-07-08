const carService = require('../../services/carService');
const rentalService = require('../../services/rentalService');
const adminService= require('../../services/adminService');
const dashboardPage = async (req, res) => {
    try {
        const dashboardData = await adminService.getDashboardData();
        res.render('admin/dashboard.ejs', {
            title: 'Admin Dashboard',
            dashboardData,
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const manageCarsPage = async (req, res) => {
    try {
        const results = await carService.getAllCars({
            ...req.query,
            limit: Number(req.query.limit) || 2
        });
        res.render('admin/manage-cars.ejs', {
            title: 'Quản lý xe',
            cars: results.cars,
            limit: results.limit,
            query: req.query,
            totalPages: results.totalPages,
            currentPage: results.currentPage,
            currentName: req.query.name || "",
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
            limit: results.limit,
            query: req.query,
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