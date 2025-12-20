const express = require('express');
const cors= require('cors')

const carRouter= require('./router/carRouter')

const app = express();

app.use(express.json());
app.use(cors());

app.use('/cars', carRouter)
app.get('/', (req, res) => {
  res.send('Vehicle Rental System API');
});

module.exports= app;