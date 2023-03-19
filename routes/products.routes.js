const express = require('express');
const router = express.Router();
const productControllers = require('../controllers/products.controllers');


router.route('/')
.get(productControllers.getAllProduct)
.post(productControllers.createNewProduct)

router.route('/:id')
.get(productControllers.getAProductById)

module.exports = router;