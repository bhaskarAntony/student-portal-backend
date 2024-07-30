const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const shortid = require('shortid');
const { v4: uuidv4 } = require('uuid');

function generateShortUniqueId() {
    // Generate a random number between 10000 and 99999
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    
    // Generate a UUID
    const uuid = uuidv4();
    
    // Extract the last 4 characters from the UUID
    const uuidSuffix = uuid.substr(uuid.length - 4);

    // Concatenate the random number and UUID suffix
    const shortId = `${randomNumber}${uuidSuffix}`;

    return shortId;
}

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://bhaskarAntoty123:bhaskar3958@bhaskarantony.wagpkay.mongodb.net/?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// // Generate unique student ID
// const generateStudentId = () => {
//   return `BP${shortid.generate()}`;
// };

// Create student schema and model
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
//   paymentMode: String,
//   totalFees: Number,
//   paidFees: Number,
//   balance: Number,
//   dueDate: Date,
  admisionDate:Date,
});

const Student = mongoose.model('allstudents', studentSchema);

// Routes
app.post('/api/student/register', async (req, res) => {
  const {
    name,
    email,
    college,
    gender,
    phoneNumber,
    guardianPhoneNumber,
    qualification,
    course,
    elite,
    professionalDetails,
    knowAbout,
   
    admisionDate
  } = req.body;

  const studentId = `BP${generateShortUniqueId()}`;

  const newStudent = new Student({
    studentId,
    name,
    email,
    college,
    gender,
    phoneNumber,
    guardianPhoneNumber,
    qualification,
    course,
    elite,
    professionalDetails,
    knowAbout,
   
    admisionDate
  });

  try {
    const savedStudent = await newStudent.save();
    res.status(200).json(savedStudent);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
app.get('/api/students/list', async(req, res)=>{
  try {
    const students = await Student.find({});
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})
app.get('/card/:studentId', async (req, res) => {
    const { studentId } = req.params;
    try {
      const student = await Student.findOne({ studentId });
  
      if (!student) {
        return res.status(404).json({ error: 'Student not found' });
      }
  
      res.json(student);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

// app.use('/api/admin', require('../'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
