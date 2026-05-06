const authService = require('../services/authService');
require('dotenv').config();

const registerUser = async (req, res) => {
    try {
       const {name, email, password}= req.body;
       const user= await authService.registerUser(name, email, password);
         res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password}= req.body;
        const token= await authService.loginUser(email, password);
        res.json({token});
    } catch (err) {
        console.error(err);
        res.status(err.statusCode || 500).json({
        message: err.message || 'Server error'
        });
    }
}

module.exports= {registerUser, loginUser};