const {Sequelize,DataTypes}= require('sequelize')
const {sequelize}= require('./db');
const User= sequelize.define('User',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    },
    email:{
        type: DataTypes.STRING,
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
},{
    tableName:'users',
    timestamps: false,
})

module.exports=User;