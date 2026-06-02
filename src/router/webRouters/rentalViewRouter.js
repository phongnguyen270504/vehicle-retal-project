const express = require('express');
const router = express.Router();

const rentalViewController = require('../../controllers/viewsController/rentalViewController');


router.get('/:id', rentalViewController.rentalDetailPage);

module.exports = router;