const { default: mongoose } = require("mongoose");


const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobile_num:{
        type:String,
        required:true
    },
    aadhar:{
        type:String,
        required:true
    },
    experienced:{
        type:Boolean,
        required:true

    }
},{timestamps:true})

module.exports = mongoose.model('employee',employeeSchema)