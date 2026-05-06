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
        customer_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        admin_id:{
            type: DataTypes.INTEGER,
            allowNull: true,
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
            type: DataTypes.ENUM('pending','active','completed','cancelled'),
            allowNull:false,
            defaultValue:'pending',
        }
    },
    {
        tableName:'rentals',
        timestamps: false,
    }
)

Rental.belongsTo(User,{foreignKey:'customer_id'});
User.hasMany(Rental,{foreignKey:'customer_id'})
Rental.belongsTo(Car,{foreignKey:'car_id'});
Car.hasMany(Rental,{foreignKey:'car_id'});
Rental.belongsTo(User,{foreignKey:'admin_id'});
User.hasMany(Rental,{foreignKey:'admin_id'});

module.exports=Rental;