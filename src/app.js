const express = require('express');
const cors= require('cors')
const path = require('path');

const carRouter= require('./router/carRouter')
const rentalRouter= require('./router/rentalRouter');
const authRouter= require('./router/authRouter');
const homeRouter= require('./router/webRouters/homeRouter');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use('/cars', carRouter)
app.use('/auth', authRouter);
app.use('/rentals', rentalRouter);
app.use('/', homeRouter);


module.exports= app;