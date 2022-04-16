const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');
const Role = require('./Role');

const User = sequelize.define('user', {
    id : {
        type: DataTypes.INTEGER,
        allowNull : false,
        primaryKey: true,
        autoIncrement: true
    },

    name : {
        type: DataTypes.STRING,
    },

    password : {
        type: DataTypes.STRING,
    },

    roles : {
        type : DataTypes.STRING,
        references: {
            model : Role,
            key : "value"
        }
    }
}, {
    timestamps: false,
});


module.exports = User;