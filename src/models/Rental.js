const {Sequelize,DataTypes}= require('sequelize')
const {sequelize}= require('./db');
const User=require('./User');
const Car =require('./Car');
const Rental= sequelize.define(
    'Rental',
    {
        id:{
            type:DataTypes.INTEGER,
            allowNull:false,
            autoIncrement: true,
            primaryKey: true
        },
        user_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        car_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        start_date:{
            type:DataTypes.DATE,
            allowNull:false,
        },
        end_date:{
            type: DataTypes.DATE,
            allowNull: false
        },
        total_price:{
            type:DataTypes.DECIMAL,
            allowNull:false,
        },
        status:{
            type: DataTypes.ENUM('active','completed','cancelled'),
            allowNull:false,
            defaultValue:'active',
        }
    }
)

Rental.belongsTo(User,{foreignKey:'user_id'});
User.hasMany(Rental,{foreignKey:'user_id'})
Rental.belongsTo(Car,{foreignKey:'car_id'});
Car.hasMany(Rental,{foreignKey:'car_id'});

module.exports=Rental;