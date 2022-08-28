const manager = require('../manager/manager');

// register-----
let Admin_Register = async (req, res, next) => {
    console.log("reached controller");
    return manager.Admin_Register(req)
        .then(data => {
            let result = {
                status: 200,
                // data: data,
                AdminDetails: data.a,
                token: data.b,
                AdminType: data.authtoken,
                hopitalId: data.id


            }
            return res.json(result);

        }).catch(next);
}
// login-----
let Admin_login = async (req, res, next) => {
    console.log("reached controller");
    return manager.Admin_login(req)
        .then(data => {
            let result = {
                status: 200,
                data: data,
                // token: data.authtoken,
                token: data.c,
                AdminType: data.type,
                hopitalId: data.id


            }
            return res.json(result);

        }).catch(next);
}

let getRegisterInfo = async (req, res, next) => {
    return manager.getRegisterInfo(req.params.id,)
        .then(data => {
            let result = {
                status: 200,
                DoctorInfo: data.DoctorInfo


            }
            return res.json(result);

        }).catch(next);
}
let editAdmin = async (req, res, next) => {
    console.log("reached controller");
    return manager.editAdmin(req, req.params.id, req.body, req.HospitalId, req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                updateAdmin: data.updateAdmin
            }
            return res.json(result);

        }).catch(next);
}

// patient start----------------------------------------------------------------------------------------------

let Add_Petient = async (req, res, next) => {
    console.log("reached controller");
    return manager.Add_Petient(req, req.HospitalId, req.AdminType
    ).then(data => {
        let result = {
            status: 200,
            data: data
        }
        return res.json(result);

    }).catch(next);
}

let destroy_patient = async (req, res, next) => {
    console.log("reached controller");
    return manager.destroy_patient(req.body, req.HospitalId, req.AdminType, req.params.id)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}


let edit_patient = async (req, res, next) => {
    console.log("reached controller");
    return manager.edit_patient(req, req.params.id, req.body, req.HospitalId, req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}

// --------------------------------------------------------------------------------------------------------
// staff start-------------------------------------------------------------------------




let Add_staff = async (req, res, next) => {
    console.log("reached controller");
    return manager.Add_staff(req, req.body, req.HospitalId, req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}




let destroy_staff = async (req, res, next) => {
    console.log("reached controller");
    return manager.destroy_staff(req.body, req.HospitalId, req.AdminType, req.params.id)
        .then(data => {
            let result = {
                status: 200,
                staff: data
            }
            return res.json(result);

        }).catch(next);
}

let edit_staff = async (req, res, next) => {
    console.log("reached controller");
    return manager.edit_staff(req, req.params.id, req.body, req.HospitalId, req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                data: data
            }
            return res.json(result);

        }).catch(next);
}

let get_staff = async (req, res, next) => {
    return manager.get_staff(req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                staffs: data
            }
            return res.json(result);

        }).catch(next);
}

let get_staff_update = async (req, res, next) => {
    return manager.get_staff_update(req.params.id,)
        .then(data => {
            let result = {
                status: 200,
                staffData: data.staff

            }
            return res.json(result);

        }).catch(next);
}


let get_patient_update = async (req, res, next) => {
    return manager.get_patient_update(req.params.id,)
        .then(data => {
            let result = {
                status: 200,
                PatientData: data.patient

            }
            return res.json(result);

        }).catch(next);
}
let get_patient = async (req, res, next) => {
    return manager.get_patient(req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                patients: data.patientdata

            }
            return res.json(result);

        }).catch(next);
}

let getAdmin = async (req, res, next) => {
    return manager.getAdmin(req.AdminType)
        .then(data => {
            let result = {
                status: 200,
                getDoctor: data.getDoctor

            }
            return res.json(result);

        }).catch(next);
}


module.exports = { Admin_Register, Admin_login, Add_Petient, Add_staff, destroy_patient, edit_patient, destroy_staff, edit_staff, get_staff, get_patient, get_staff_update, get_patient_update, getAdmin, getRegisterInfo, editAdmin }