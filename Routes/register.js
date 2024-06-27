// Routes
const express = require('express');
const router = express.Router();
const Student = require('../models/register');
const shortid = require('shortid');

// Generate unique student ID
const generateStudentId = () => {
    return `BP${shortid.generate()}`;
  };

router.post('/student/register', async (req, res) => {
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
      paymentMode,
      totalFees,
      paidFees,
      balance,
      dueDate,
    } = req.body;
  
    const studentId = generateStudentId();
  
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
      paymentMode,
      totalFees,
      paidFees,
      balance,
      dueDate,
    });
  
    try {
      const savedStudent = await newStudent.save();
      res.status(200).json(savedStudent);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

module.exports = router;