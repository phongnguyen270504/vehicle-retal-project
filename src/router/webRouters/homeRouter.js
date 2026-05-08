const express = require('express');
const router = express.Router();
const pageController = require('../../controllers/pageController');

router.get('/', pageController.homeRender);

module.exports = router;