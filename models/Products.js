const mongoose = require('mongoose');

// Schema design for Electronics

const ProductsSchema = mongoose.Schema({
    name : {
        type: String,
        required: [true, 'Name is required.'], 
        trim: true,
        unique: true,
        minLength: [3, 'Name must be at least 3 characters long.'],
        maxLength: [30, 'Name cannot more than 30 characters long.']
    },
    description: {
        type : String,
        trim: true,
        minLength: [5, "Description must be at least 3 character long"],
        maxLength: [200, "Description cannot more then 200 characters long."],
        required: [true, 'Description is required.']
    },
    price: {
        type: Number,
        required: [true, 'Price is required.'],
        min: [10, 'Price must be at least $10']
    }, 
    image: {
        type: String,
        required: [true, 'Image is required.'],
    },
    views: {
        type: Number
    }
})

const Products = mongoose.model('Electronics', ProductsSchema);

module.exports = Products;