const { Sequelize } = require("sequelize");
const sequelize = require("../config/db");
// sequelize.sync({ force: true })
const HospitalAuth = sequelize.define("hospital_auth", {
    id: {
        type: Sequelize.DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    hospitalId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    adminType: {
        type: Sequelize.STRING,
        allowNull: false,
    },

    token: {
        type: Sequelize.STRING,

    }

},
    {
        timestamps: false,
        freezeTableName: true
    });

module.exports = HospitalAuth;