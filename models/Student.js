const mongoose = require('mongoose');

const installmentSchema = new mongoose.Schema({
  number: { type: String, required: true },
  amount: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  date: { type: Date },
});

const studentSchema = new mongoose.Schema({
  studentId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  email: { type: String, required: true },
  course: { type: String, required: true },
  totalFees: { type: Number, required: true },
  installments: [installmentSchema],
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
