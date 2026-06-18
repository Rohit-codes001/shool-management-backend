import validator from 'validator'
import BookDemoModel from '../models/Bookdemo.js'
import schoolRegistrationModel from '../models/schoolRegistration.js';
import bcrypt from 'bcrypt'
async function Register(req, res) {

}

async function Login(req, res) {

}



async function BookADemo(req, res) {
  let {
    name,
    schoolName,
    phoneNo,
    whatsAppNo,
    email,
    city,
    state,
    studentsRange,
    teachersRange,
    message,
    captchaToken
  } = req.body.formdata



  name = name?.trim();
  schoolName = schoolName?.trim();
  email = email?.trim().toLowerCase();
  phoneNo = phoneNo?.trim();
  whatsAppNo = whatsAppNo?.trim();
  city = city?.trim();
  state = state?.trim();
  message = message?.trim();



  const existingBooking = await BookDemoModel.findOne({
    $or: [{ email }, { phoneNo }],
  });


  const phoneRegex = /^[6-9]\d{9}$/;

  if (existingBooking) {
    return res.status(409).json({
      success: false,
      message:
        "A demo has already been booked using this email or phone number",
    });
  }

  if (!validator.isEmail(email)) {
    return res.json({ success: false, message: "Please provide email in valid format" })
  }
  if (!phoneRegex.test(phoneNo)) {
    return res.json({ success: false, message: 'Please Enter a valid phone number' })
  }
  if (!captchaToken) {
    return res.json({ success: false, message: 'Invalid captcha' })
  }
  try {
    const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        secret: process.env.GOOGLE_CAPTCHA_SECRET,
        response: captchaToken
      })
    });

    let data = await response.json();
     console.log(data.success)
    if (!data.success) {
      return res.status(400).json({
        success: false,
        message: "Captcha verification failed",
      });
    }

    let BookNewDemo = new BookDemoModel({
      name,
      schoolName,
      phoneNo,
      whatsAppNo,
      email,
      city,
      state,
      studentsRange,
      teachersRange,
      message,

    })

    await BookNewDemo.save()
    return res.status(201).json({
      success: true,
      message: "Your free demo has been booked successfully",
    });


  } catch (err) {

    console.error("Full Error:", err);
  return res.status(500).json({
    success: false,
    message: err.message
  });

  }





}

async function RegisterAschool(req, res) {

  let {schoolName,
    registrationNumber,
    schoolBoard,
    schoolType,
    officialEmail,
    mobileNumber,
    schoolPin,
    address,
    city,
    state,
    pinCode,
    adminName,
    adminEmail,
    adminMobile,
    password,
    confirmPassword,
    acceptTerms
 } = req.body.formData

console.log(req.body.formdata)

 schoolName = schoolName?.trim()
    registrationNumber = registrationNumber?.trim()
    schoolBoard = schoolBoard?.trim()
    schoolType = schoolType?.trim()
    officialEmail = officialEmail?.trim()
    mobileNumber = mobileNumber?.trim()
    schoolPin = schoolPin?.trim()
    address = address?.trim()
    city = city?.trim()
    state = state?.trim()
    pinCode = pinCode?.trim()
    adminName = adminName?.trim()
    adminEmail = adminEmail?.trim()
    adminMobile = adminMobile?.trim()
    password = password?.trim()
    confirmPassword = confirmPassword?.trim();

 const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=])[A-Za-z\d@$!%*?&^#()_\-+=]{8,}$/;
   
  const phoneRegex = /^[6-9]\d{9}$/;
 try{




const existingSchool = await schoolRegistrationModel.findOne({
  $or: [
    { officialEmail: officialEmail },
    { adminEmail: adminEmail },
    { adminMobile: adminMobile },
  ],
});

if (existingSchool) {
  return res.status(409).json({
    success: false,
    message: "School already registered with this email or mobile number",
  });
}

  if(!phoneRegex.test(mobileNumber)  || !phoneRegex.test(adminMobile)){
    
    return res.json({ success: false, message: 'Please Enter a valid phone number' })

  }

 if(!passwordRegex.test(password)){
  return res.json({success:false , message:'The password must be at least include 1 uppercase 1 lowercase 1 number  and 1 special character'})
 }
   if(password != confirmPassword){
    return res.json({success:false , message:'password and confirm password should be same'})
  }

  if (!acceptTerms) {
  return res.status(400).json({
    success: false,
    message: "Please accept terms and conditions",
  });
} 
const hashedPassword = await bcrypt.hash(password, 10);

 const newschool = new schoolRegistrationModel({
  schoolName,
    registrationNumber,
    schoolBoard,
    schoolType,
    officialEmail,
    mobileNumber,
    schoolPin,
    address,
    city,
    state,
    pinCode,
    adminName,
    adminEmail,
    adminMobile,
    password : hashedPassword,
    acceptTerms

 })



 await newschool.save()

 return res.status(201).json({success:true , message:'congratulation Registration successfull'})
    
 

 }catch(err){

  console.log(err.message)
  return res.status(500).json({success:false , message:'somthing went wrong'})

 }


}

export { Register, Login, BookADemo, RegisterAschool }
