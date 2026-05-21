const express = require('express');
const cors= require('cors')
const path = require('path');

const carRouter= require('./router/carRouter')
const rentalRouter= require('./router/rentalRouter');
const authRouter= require('./router/authRouter');
const carViewRouter= require('./router/webRouters/carViewRouter');
const authViewRouter= require('./router/webRouters/authViewRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/api/cars', carRouter)
app.use('/api/auth', authRouter);
app.use('/api/rentals', rentalRouter);
app.use('/', carViewRouter);
app.use('/auth', authViewRouter);


module.exports= app;