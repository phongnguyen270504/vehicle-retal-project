const express = require('express');
const router = express.Router();

const rentalViewController = require('../../controllers/viewsController/rentalViewController');

const authSessionMiddleware= require('../../middlewares/auth.session.middleware');

router.post('/:id/confirm', authSessionMiddleware.isAdmin, rentalViewController.confirmRental);

router.post('/:id/cancel', rentalViewController.cancelRental);

router.post('/:id/complete', authSessionMiddleware.isAdmin ,rentalViewController.completeRental);

router.get('/:id', rentalViewController.rentalDetailPage);



module.exports = router;