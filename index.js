const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const colors = require('colors');
const mongoose = require('mongoose')

// Middleware
app.use(express.json());
app.use(cors());

// Connecting to the database
mongoose.connect(process.env.DATABASE_LOCAL).then(() => {
    console.log('Database connected successfully!'.green.bold)
});

app.get('/', (req,res) => {
    res.write(`<h1>Hello, Welcome to Electronics bd.</h1>`);
    res.end();
})

const productsRoute = require('./routes/products.routes');


app.use('/products', productsRoute)


app.listen(PORT, () => {
    console.log('Server is listening on port'.green.bold, PORT);
})
