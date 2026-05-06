const express = require('express');
const cors= require('cors')

const carRouter= require('./router/carRouter')
const rentalRouter= require('./router/rentalRouter');
const authRouter= require('./router/authRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/cars', carRouter)
app.use('/auth', authRouter);
app.use('/rentals', rentalRouter);


module.exports= app;