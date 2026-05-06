const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');

const loginUser= async (email, password) => {
    const user = await User.findOne({ where: { email } });
    if (!user) {
        const err = new Error('Tài khoản hoặc mật khẩu không đúng');
        err.statusCode = 404;
        throw err;
    }
    const isMatch = await bcrypt.compare(password, user.hashpass);
    if (!isMatch) {
        const err = new Error('Tài khoản hoặc mật khẩu không đúng');
        err.statusCode = 401;
        throw err;
    }
    const token = jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return token; 
}

const registerUser = async (name, email, password) => {
    const hashpass = await bcrypt.hash(password, 10);
    const user = await User.create({
        email,
        hashpass,
        role: 'customer'
    });
    return {
        id: user.id,
        email: user.email,
        role: user.role
    };
}

module.exports = { loginUser , registerUser};