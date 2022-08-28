const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Patients = sequelize.define('patient', {
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

    patientName: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    patientLastname: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    patientAge: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    patientMobile: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    Gender: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    disease: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    treatment: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    patientType: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    paidPayment: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    duePayment: {
        type: Sequelize.STRING,
        allowNull: false,

    },
    patientTreatmentDate: {
        type: Sequelize.STRING,
        allowNull: false,

    },

    patientPhoto: {
        type: Sequelize.TEXT,
        allowNull: false,

    }




}, {
    timestamps: false,
    freezeTableName: true
});




module.exports = Patients;
