
import mongoose from 'mongoose'

let newSchoolRegistrationSchema = new mongoose.Schema({
    schoolName:{type:String , required:true},
    registrationNumber:{type:String ,required:true},
    schoolBoard:{type:String ,required:true},
    schoolType:{type:String ,required:true},
    officialEmail:{type:String ,required:true},
    mobileNumber:{type:String ,required:true},
    schoolPin:{type:String,required:true},
    address:{type:String ,required:true},
    city:{type:String ,required:true},
    state:{type:String ,required:true},
    pinCode:{type:String ,required:true},
    adminName:{type:String ,required:true},
    adminEmail:{type:String ,required:true},
    adminMobile:{type:String ,required:true},
    password:{type:String ,required:true},
    acceptTerms: {type:Boolean, default:false},
  
} )

let schoolRegistrationModel  = mongoose.models.ResgisteredSchoools || mongoose.model('ResgisteredSchoools' , newSchoolRegistrationSchema)

export default schoolRegistrationModel