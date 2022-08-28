// const Doctor = require('../models/Doctor');
const Staff = require('../models/Staff');
const Petients = require('../models/Patients');
const HospitalAuth = require('../models/hospital_auth');
const BadRequestError = require('../errorHandler/BadRequestError');
const Doctor = require('../models/Doctor');




// register----
let Admin_Register = async (req) => {

    console.log("manager reached");
    // if (!req.body.AdminName || !req.body.AdminEmail || !req.body.AdminMobile || !req.body.AdminType || !req.body.AdminAddress || !req.body.AdminPassword) {

    //     throw new BadRequestError("Field Missing")
    // }
    let newuser = {


        adminName: req.body.AdminName,
        adminEmail: req.body.AdminEmail,
        adminMobile: req.body.AdminMobile,
        adminType: req.body.AdminType,
        adminAddress: req.body.AdminAddress,
        adminPassword: req.body.AdminPassword
    }

    console.log(req.body);

    let a = await Doctor.create(newuser);
    // let admin1 = a.AdminName;
    console.log(a)
    let authtoken = { token: Math.random(10), hospitalId: a.id, adminType: a.adminType }

    let b = await HospitalAuth.create(authtoken);
    console.log(b.token)
    return { a: a.adminEmail, b: b.token, authtoken: authtoken.adminType, id: b.hospitalId }

}






// login------
let Admin_login = async (req) => {

    console.log("reached manager function");

    if (!req.body.AdminEmail) {
        throw new BadRequestError("Please enter your name");

    } if (!req.body.AdminType) {

        throw new BadRequestError("Please Enter AminType");
    }
    if (!req.body.AdminPassword) {

        throw new BadRequestError("Please Enter password");

    }


    let findData = {};



    findData["$and"] = [
        { adminEmail: { $eq: req.body.AdminEmail } },
        { adminType: { $eq: req.body.AdminType } },
        { adminPassword: { $eq: req.body.AdminPassword } },


    ]


    // console.log("findData")
    // console.log("findData", findData)

    let Admin = await Doctor.findOne({ where: findData, raw: true });

    let authtoken = { token: Math.random(10), hospitalId: Admin.id }
    let typr = await HospitalAuth.findOne({ where: { hospitalId: Admin.id }, raw: true });


    let b = await HospitalAuth.update(authtoken, { where: { hospitalId: Admin.id } });
    let c = await HospitalAuth.findOne({ where: { hospitalId: Admin.id }, raw: true })
    console.log(c.token)
    console.log(c.hospitalId)
    console.log("successfully logedin")
    return { authtoken: authtoken, c: c.token, type: typr.adminType, id: c.hospitalId }

}


let getRegisterInfo = async (id) => {
    console.log("login function reached");

    let findData = { id: id }
    console.log(findData);
    let DoctorInfo = await Doctor.findAll({ where: { id: id }, raw: true, });

    console.log(DoctorInfo);
    return { DoctorInfo }
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }
}

let editAdmin = async (req, id, body, HospitalId, AdminType) => {
    console.log("manager reached edit staff");

    let findData = { id: HospitalId }

    let isExist = await HospitalAuth.findAll({ where: findData, raw: true })
    console.log(isExist);
    if (!isExist) {
        throw new BadRequestError("This entry is not belongs to you")
    }


    // console.log(req.body)


    let edit_staff = {


        // id: HospitalId,
        adminName: req.body.AdminName,
        adminEmail: req.body.AdminEmail,
        adminMobile: req.body.AdminMobile,
        adminType: req.body.AdminType,
        adminAddress: req.body.AdminAddress,
        adminPassword: req.body.AdminPassword,

        //     Staff_profilepic: req.files.Staff_profilepic[0].filename,
    }
    // if (AdminType == "mainDoctor") {
    let updateAdmin
        = await Doctor.update(edit_staff, { where: { id: id } });
    return { updateAdmin: updateAdmin };
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }


}



// ----------------------------------------------------------------------------------------------------------------
let Add_Petient = async (req, HospitalId,) => {
    console.log("manager reached");
    console.log(req.file.filename);
    // console.log(req.body);

    let body = JSON.parse(req.body.body);
    console.log(body)
    let new_patient = {
        hospitalId: HospitalId,
        patientName: body.patientName,
        patientLastname: body.patientLastname,
        patientAge: body.patientAge,
        patientMobile: body.patientMobile,
        Gender: body.Gender,
        disease: body.disease,
        treatment: body.treatment,
        patientType: body.patientType,
        paidPayment: body.paidPayment,
        duePayment: body.duePayment,
        patientTreatmentDate: body.patientTreatmentDate,
        patientPhoto: req.file.filename,


    }

    // console.log(new_patient);


    // if (AdminType == "AssitantDoctor" || AdminType == "mainDoctor") {
    let ptnts = await Petients.create(new_patient);
    return ptnts;



    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`);
    // }


}

// ------------------------------------------------------------------------------------------------------------
let Add_staff = async (req, body, HospitalId, AdminType) => {
    console.log("manager reached");

    // if (!req.body.Staff_Name || !req.body.Staff_Lastname || !req.body.Gender || !req.body.Staff_Mobilenumber || !req.body.gender || (!req.files.Staff_profilepic)) {
    //     throw new BadError("Field Missing")
    // }
    let new_staff = {
        hospitalId: HospitalId,
        staffName: body.staffName,
        staffLastname: body.staffLastname,
        staffMobileNumber: body.staffMobileNumber,
        staffAddress: body.staffAddress,
        staffBloodgroup: body.staffBloodgroup,
        staffAge: body.staffAge,
        gender: body.gender,
        staffPost: body.staffPost,
        staffJoiningDate: body.staffJoiningDate,
        salary: body.salary,
        patientTreatmentdate: body.patientTreatmentdate,

        // staffprofilepic: req.files.staffprofilepic[0].filename,

    }
    console.log(body);
    console.log("body");

    // let staff = await Staff.create(new_staff);
    // console.log("successfully")
    // return staff;

    if (AdminType == "mainDoctor") {
        let staff = await Staff.create(new_staff);
        console.log("successfully")
        return staff;
    } else {
        throw new BadRequestError(`Sorry ,only mainDoctor can access this`);
    }


}

// -----------------------------------------------------------------------------------------------------------


let destroy_patient = async (body, HospitalId, AdminType, id) => {
    console.log("manager reached");

    let findData = { hospitalId: HospitalId }
    let isExist = await HospitalAuth.findOne({ where: findData, raw: true })

    if (!isExist) {
        throw new BadRequestError("This entry is not belongs to you")
    }


    // if (AdminType == "mainDoctor") {
    let c = await Petients.destroy({ where: { id: id } });

    console.log("successfully logedin")
    return c;
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }
}


// ----------------------------------------------------------------------------------------------------------------

let edit_patient = async (req, id, body, HospitalId, AdminType) => {
    console.log("manager reached");

    let findData = { id: HospitalId }

    let isExist = await HospitalAuth.findOne({ where: findData, raw: true })
    if (!isExist) {
        throw new BadRequestError("This entry is not belongs to you")
    }


    console.log(body)


    let edit_patient = {

        patientName: body.patientName,
        patientLastname: body.patientLastname,
        patientAge: body.patientAge,
        patientMobile: body.patientMobile,
        Gender: body.Gender,
        disease: body.disease,
        treatment: body.treatment,
        patientType: body.patientType,
        paidPayment: body.paidPayment,
        duePayment: body.duePayment,
        patientTreatmentDate: body.patientTreatmentDate,

        // Patient_Photo: req.files.Patient_Photo[0].filename,




    }




    // if (AdminType == "mainDoctor") {
    let exp = await Petients.update(edit_patient, { where: { id: id } });
    return exp;
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }


}




let destroy_staff = async (body, HospitalId, AdminType, id) => {
    console.log("manager reached");

    let findData = { hospitalId: HospitalId }
    let isExist1 = await HospitalAuth.findOne({ where: findData, raw: true })

    if (!isExist1) {
        throw new BadRequestError("This entry is not belongs to you")
    }


    if (AdminType == "mainDoctor") {
        let c = await Staff.destroy({ where: { id: id }, raw: true });

        console.log("successfully logedin")
        return c;
    } else {
        throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    }
}

let edit_staff = async (req, id, body, HospitalId, AdminType) => {
    console.log("manager reached edit staff");

    let findData = { id: HospitalId }

    let isExist = await HospitalAuth.findOne({ where: findData, raw: true })
    if (!isExist) {
        throw new BadRequestError("This entry is not belongs to you")
    }


    console.log(body)


    let edit_staff = {


        hospitalId: HospitalId,
        staffName: body.staffName,
        staffLastname: body.staffLastname,
        staffMobileNumber: body.staffMobileNumber,
        staffAddress: body.staffAddress,
        staffBloodgroup: body.staffBloodgroup,
        staffAge: body.staffAge,
        gender: body.gender,
        staffPost: body.staffPost,
        staffJoiningDate: body.staffJoiningDate,
        salary: body.salary,
        patientTreatmentdate: body.patientTreatmentdate,

        //     Staff_profilepic: req.files.Staff_profilepic[0].filename,
    }
    if (AdminType == "mainDoctor") {
        let exp = await Staff.update(edit_staff, { where: { id: id } });
        return exp;
    } else {
        throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    }


}



let get_staff = async (AdminType) => {
    console.log("login function reached");

    if (AdminType == 'mainDoctor') {
        let staff_data = await Staff.findAll({ raw: true, });

        console.log(staff_data);
        return staff_data
    } else {
        throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    }
}

let get_patient = async (AdminType) => {
    console.log("login function reached bbb");

    // if (AdminType == "mainDoctor") {
    let patientdata = await Petients.findAll({ raw: true });

    console.log(patientdata);
    return { patientdata }
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }




}

let get_staff_update = async (id) => {
    console.log("login function reached");

    let findData = { id: id }
    console.log(findData);
    let staff = await Staff.findOne({ where: findData, raw: true, });

    console.log(staff);
    return { staff }
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }
}
let get_patient_update = async (id) => {
    console.log("login function reached");

    let findData = { id: id }
    console.log(findData);
    let patient = await Petients.findOne({ where: findData, raw: true, });

    console.log(patient.id);
    return { patient: patient }
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }
}
let getAdmin = async (AdminType) => {
    console.log("login function reached bbb");

    // if (AdminType == "mainDoctor") {
    let getDoctor = await Doctor.findAll({ raw: true });

    console.log(getDoctor);
    return { getDoctor: getDoctor }
    // } else {
    //     throw new BadRequestError(`Sorry ,only mainDoctor can access this`)
    // }




}








module.exports = { Admin_Register, Admin_login, Add_Petient, Add_staff, destroy_patient, edit_patient, destroy_staff, edit_staff, get_staff, get_patient, get_staff_update, get_patient_update, getAdmin, getRegisterInfo, editAdmin };