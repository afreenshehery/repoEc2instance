const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// sequelize.sync({ force: true })


// sequelize.sync({ force: true })
const Doctor = sequelize.define('doctor', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    adminName: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    adminEmail: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    adminMobile: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    adminType: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    adminAddress: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    adminPassword: {
        type: Sequelize.STRING,
        allowNull: false,

    },

}, {

    freezeTableName: true
});




module.exports = Doctor;
