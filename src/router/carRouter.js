const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');
const authMiddleware = require('../middlewares/auth.middleware');


router.get('/',carController.getAllCars);
router.get('/:id',carController.getCarById);
router.post('/',authMiddleware.verifyToken,authMiddleware.verifyRole('admin'),carController.createCar);
router.put('/:id',authMiddleware.verifyToken,authMiddleware.verifyRole('admin'),carController.updateCar);
router.delete('/:id',authMiddleware.verifyToken,authMiddleware.verifyRole('admin'),carController.deleteCar);

module.exports = router;