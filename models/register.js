const mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    studentId: String,
    name: String,
    email: String,
    college: String,
    gender: String,
    phoneNumber: String,
    guardianPhoneNumber: String,
    qualification: String,
    course: String,
    elite: String,
    professionalDetails: String,
    knowAbout: [String],
    paymentMode: String,
    totalFees: Number,
    paidFees: Number,
    balance: Number,
    dueDate: Date,
  });
  
   const Student = mongoose.model('AllStudents', studentSchema);
   module.exports = Student;