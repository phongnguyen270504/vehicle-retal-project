const {Sequelize,DataTypes}= require('sequelize')
const {sequelize}= require('./db');

const Brand= sequelize.define(
    'Brand',{
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true,
        },
        name:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true,
        }
    },{
        tableName:'brands',
        timestamps:false,
    }
);

module.exports=Brand;
