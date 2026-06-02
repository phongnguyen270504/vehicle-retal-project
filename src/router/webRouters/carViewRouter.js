const express = require('express');
const router = express.Router();
const carViewController = require('../../controllers/viewsController/carViewController');


router.get('/', carViewController.indexPage);

router.get('/create', carViewController.createCarPage);
router.post('/create', carViewController.createCar);

router.post('/:id/delete', carViewController.deleteCar);

router.get('/:id/update', carViewController.updateCarPage);
router.post('/:id/update', carViewController.updateCar);

router.get('/:id/booking', carViewController.bookingCarPage);
router.post('/:id/booking', carViewController.bookingCar);

router.get('/:id', carViewController.getCarById);



module.exports = router;