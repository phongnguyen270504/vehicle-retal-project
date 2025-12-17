const {Sequelize,DataTypes}= require('sequelize')
const {sequelize}= require('./db');
const User= sequelize.define('User',{
    username: {
        type: DataTypes.STRING(50),
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull:false,
        unique: true,
        validate:{
            isEmail:true,
            notEmpty:true,
        }
    },
    hashpass:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty:true,
            len: [6, 100],
        }
    },
    role:{
        type: DataTypes.ENUM('admin','customer'),
        allowNull:false,
        defaultValue: 'customer',
        validate: {
            isIn: [['admin', 'customer']]
        }
    }
})

module.exports=User;