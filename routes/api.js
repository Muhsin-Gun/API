const express = require("express");
const routes = express.Router();
const studentController = require("../Controller/studentController");
const {verifyAccessToken} = require('../helpers/jwtHelper')
// Get a list of students from the database
routes.get('/getstudent', verifyAccessToken,studentController.getAllStudents);

// Add a student to the database
routes.post('/addstudent', verifyAccessToken, studentController.addStudent);

// Update a student in the database
routes.patch('/updatestudent/:id', verifyAccessToken, studentController.updateStudent);

// Delete a student from the database
routes.delete('/deletestudent/:id',verifyAccessToken, studentController.deleteStudent);

module.exports = routes;


