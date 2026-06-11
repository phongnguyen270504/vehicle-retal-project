const express = require('express');
const router = express.Router();

const rentalViewController = require('../../controllers/viewsController/rentalViewController');

router.post('/:id/confirm', rentalViewController.confirmRental);

router.post('/:id/cancel', rentalViewController.cancelRental);

router.post('/:id/complete', rentalViewController.completeRental);

router.get('/:id', rentalViewController.rentalDetailPage);



module.exports = router;