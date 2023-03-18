const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products.controllers');


router.route('/')
.get(productControllers.getAllProduct)

module.exports = router;