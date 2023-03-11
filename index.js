const express = require('express');
const app = express();
const cors = require('cors');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 5000;
const colors = require('colors');

// Middleware
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.write(`<h1>Hello, Welcome to Electronics bd.</h1>`);
    res.end();
})


app.listen(PORT, () => {
    console.log('Server is listening on port'.green.bold, PORT);
})

