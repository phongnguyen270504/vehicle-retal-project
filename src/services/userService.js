const User = require('../models/User');

const getAllUsers = async () => {
    const users = await User.findAll({
        attributes: ['id', 'fullname', 'phone', 'email', 'role', 'user_status'],
        order: [['id', 'ASC']],
    });
    
    return users;
   }

module.exports = {
    getAllUsers,
}