// const Employee = require("../model/employee");
// const manager = require('../manager/manager');
// const BadRequestError = require('../errorHandler/BadRequestError')


const HospitalAuth = require("../models/hospital_auth")
const BadRequestError = require('../errorHandler/BadRequestError')
// login---
let uservalidateToken = async (req, res, next) => {
    console.log(req.headers.token)
    let token = req.headers.token
    let Admin = await HospitalAuth.findOne({ where: { token: token }, raw: true });
    console.log(Admin);
    if (!Admin) {
        throw new BadRequestError("User Invalid")
    }
    req.HospitalId = Admin.HospitalId
    next()
}

let validateAdminType = async (req, res, next) => {
    console.log("gggg")

    try {
        let token = req.headers.token;


        let type = await HospitalAuth.findOne({ where: { token: token }, raw: true });
        console.log(type);
        if (!type) {
            throw new BadRequestError("User Invalid")
        }
        req.HospitalId = type.hospitalId,
            req.AdminType = type.adminType
        next()
    }
    catch (e) {
        console.log(e);
        next(e);
    }
}







module.exports = { uservalidateToken, validateAdminType }
