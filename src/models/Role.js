const {DataTypes, Model} = require('sequelize');
const sequelize = require('../db');

const Role = sequelize.define('role', {

    value : {
        type: DataTypes.STRING,
        unique : true,
        allowNull: false,
        defaultValue : "USER"
    }

}, {
    timestamps: false
});


module.exports = Role;