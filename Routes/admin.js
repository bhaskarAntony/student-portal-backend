const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const nodemailer = require('nodemailer');

// Admin confirm payment request
router.post('/confirm-payment', async (req, res) => {
  const { studentId, installmentNumber, status } = req.body;

  try {
    const student = await Student.findOne({ studentId });

    if (!student) {
      return res.status(404).json({ error: 'Student not found' });
    }

    const installment = student.installments.find(inst => inst.number === installmentNumber);

    if (!installment) {
      return res.status(404).json({ error: 'Installment not found' });
    }

    installment.status = status;

    await student.save();

    if (status === 'Paid') {
      // Send email confirmation
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-email-password',
        },
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: student.email,
        subject: 'Payment Confirmation',
        text: `Your payment for installment ${installment.number} has been confirmed. You can now download your receipt.`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log('Email sent: ' + info.response);
      });
    }

    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get receipt details
router.get('/receipt/:studentId', async (req, res) => {
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

module.exports = router;
