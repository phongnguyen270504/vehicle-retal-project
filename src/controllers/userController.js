const userService = require('../services/userService');
const getAllUsers = async (req,res) => {
    try {
        const users = await userService.getAllUsers();
        res.json(users);
    }
    catch (err) {
         res.status(err.statusCode || 500).json({
            message: err.message || 'Server error'
        });
    }
}

module.exports = {
    getAllUsers,
}
