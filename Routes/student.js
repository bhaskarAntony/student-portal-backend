const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Register a new student
router.post('/register', async (req, res) => {
  const { name, email, course, totalFees } = req.body;
  const installmentAmount = totalFees / 5;
  const studentId = `BP${Date.now()}`;

  const newStudent = new Student({
    studentId,
    name,
    email,
    course,
    totalFees,
    installments: Array.from({ length: 5 }, (v, i) => ({
      number: i + 1,
      amount: installmentAmount,
    })),
  });

  try {
    const student = await newStudent.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Submit a payment request
router.post('/payment', async (req, res) => {
  const { studentId, installmentNumber, date, amount } = req.body;

  try {
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const installment = student.installments.find(inst => inst.number === installmentNumber);

    if (!installment) {
      return res.status(404).json({ error: 'Installment not found' });
    }

    installment.status = 'Pending Approval';
    installment.amount = amount;
    installment.date = date;

    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
