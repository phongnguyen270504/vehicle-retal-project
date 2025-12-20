const {Sequelize,DataTypes}= require('sequelize')
const {sequelize}= require('./db');
const Brand = require('./Brand');
const CarType= require('./CarType');
const Car= sequelize.define(
    'Car',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement:true,
            allowNull:false
        },
        name: {
            type: DataTypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:true
            }
        },
        brand_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        type_id:{
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        price_per_day:{
            type: DataTypes.DECIMAL,
            allowNull:false,
        },
        status:{
            type: DataTypes.ENUM('available','rented','maintenance'),
            defaultValue: 'available'
        },
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        }
    },{
        tableName:'cars',
        timestamps: false,
    }
);

Car.belongsTo(Brand,{ foreignKey:'brand_id'});
Brand.hasMany(Car,{foreignKey:'brand_id'})
Car.belongsTo(CarType,{foreignKey:'type_id'});
CarType.hasMany(Car,{foreignKey:'type_id'})

module.exports=Car;