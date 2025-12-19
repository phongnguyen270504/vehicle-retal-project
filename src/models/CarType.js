const {Sequelize,DataTypes}= require('sequelize')
const {sequelize}= require('./db');


const CarType= sequelize.define(
    'CarType',{
        id: {
            type: DataTypes.INTEGER,
            autoIncrement:true,
            primaryKey: true,
            allowNull:false
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
        }
},{
    tableName:'vehicle_types',
    timestamps: false,
});

module.exports=CarType;