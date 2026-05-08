const express = require('express');
const router = express.Router();

const rentalController = require('../controllers/rentalController');
const authMiddleware = require('../middlewares/auth.middleware');

router.post('/', authMiddleware.verifyToken,authMiddleware.verifyRole(['customer']), rentalController.createRental);
router.get('/', authMiddleware.verifyToken,authMiddleware.verifyRole(['admin']), rentalController.getAllRentals);
router.get('/my', authMiddleware.verifyToken,rentalController.getAllRentalsByUser);
router.get('/:id', authMiddleware.verifyToken, rentalController.getRentalById);
router.patch('/:id/confirm', authMiddleware.verifyToken,authMiddleware.verifyRole(['admin']), rentalController.confirmRental);
router.patch('/:id/cancel', authMiddleware.verifyToken,authMiddleware.verifyRole(['customer', 'admin']), rentalController.rentalCancel);
router.patch('/:id/complete', authMiddleware.verifyToken,authMiddleware.verifyRole(['customer', 'admin']), rentalController.rentalComplete);

module.exports = router;
