const express = require('express');
const router = express.Router();
const carViewController = require('../../controllers/viewsController/carViewController');

router.get('/cars', carViewController.indexPage);
router.get('/cars/:id', carViewController.getCarById);
router.get('/cars/:id/booking', carViewController.bookingCarPage);

module.exports = router;