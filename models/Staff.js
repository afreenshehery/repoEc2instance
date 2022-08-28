const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');
// sequelize.sync({ force: true })


const Staff = sequelize.define('staff', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    hospitalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },

    staffName: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    staffLastname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    staffMobileNumber: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    staffAddress: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    staffBloodgroup: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    staffAge: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    gender: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    staffPost: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    staffJoiningDate: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    salary: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    patientTreatmentdate: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    //  staffprofilepic: {
    //     type: Sequelize.TEXT,
    //     allowNull: false,
    // }




}, {
    timestamps: false,
    freezeTableName: true
});




module.exports = Staff;
