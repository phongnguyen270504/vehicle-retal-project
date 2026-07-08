const express = require('express');
const router = express.Router();
const carViewController = require('../../controllers/viewsController/carViewController');
const authSessionMiddleware= require('../../middlewares/auth.session.middleware');
const uploadMiddleware= require('../../middlewares/upload.middleware');

router.get('/', carViewController.indexPage);

router.get('/create',
    authSessionMiddleware.isLogin, 
    authSessionMiddleware.isAdmin, 
    carViewController.createCarPage);
router.post('/create', 
    authSessionMiddleware.isLogin, 
    authSessionMiddleware.isAdmin,
    uploadMiddleware,
    carViewController.createCar);

router.post('/:id/delete', 
    authSessionMiddleware.isLogin, 
    authSessionMiddleware.isAdmin, 
    carViewController.deleteCar);

router.get('/:id/update', 
    authSessionMiddleware.isLogin, 
    authSessionMiddleware.isAdmin, 
    carViewController.updateCarPage);
router.post('/:id/update',
    authSessionMiddleware.isLogin, 
    authSessionMiddleware.isAdmin, 
    carViewController.updateCar);

router.get('/:id/booking',
    authSessionMiddleware.isLogin
    , carViewController.bookingCarPage);
router.post('/:id/booking', 
    authSessionMiddleware.isLogin,
    carViewController.bookingCar);

router.get('/:id', carViewController.getCarById);



module.exports = router;