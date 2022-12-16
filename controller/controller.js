const { default: mongoose } = require("mongoose");
const empModel = require("../employee_model/empModel");
const errHandler = require("../middleware/errHandler");
const bcrypt = require('bcrypt');

//Create API

const createEmp = async (req, res, next) => {
    try {
        const { name, email, mobile_num, aadhar, experienced } = req.body;
        const hashAadhar = await bcrypt.hash(aadhar,7)
        const employee = new empModel({ ...req.body,aadhar:hashAadhar });
        const existEmail = await empModel.findOne({ email :email })
        if (existEmail) return next(errHandler(401, 'Given email has already been existed'));
        const existPhoneNum = await empModel.findOne({ mobile_num: mobile_num });
        if (existPhoneNum) return next(errHandler(401, "Given Mobile number has been already existed try with another one "));
        const empSave = await employee.save();
        res.status(200).json({
            message: "Given employee details has been added successfully ",
            data: empSave
        });
    } catch (error) {
        next(error)
    }
}


//Read API
const readEmp = async (req, res, next) => {
    try {

        const getData = await empModel.findById(req.params.id);
        res.status(200).json(getData);
    } catch (error) {
        next(error)
    }
}

//Update API

const updateEmp = async (req, res, next) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return next(errHandler(401, "Invalid id "))
        }

        const updateData = await empModel.findOneAndUpdate(id, {
            $set: req.body
        }, { new: true });
        res.status(200).json({
            message: "Employee has updated successfully",
            data: updateData
        })
    } catch (error) {
        next(error)
    }
}


//Delete API


const deleteEmp = async (req, res, next) => {
        try {
            const deleteData = await empModel.findOneAndDelete(req.params.id);
            res.status(200).json({
                message: "Employee details have deleted successfully"
            })
        } catch (error) {
            next(error)
        }
}


module.exports = {
    createEmp,
    readEmp, 
    updateEmp,
    deleteEmp
}