const express = require("express");
const routes = express.Router();
const studentController = require("../Controller/studentController");

// Get a list of students from the database
routes.get('/getstudent', studentController.getAllStudents);

// Add a student to the database
routes.post('/addstudent', studentController.addStudent);

// Update a student in the database
routes.patch('/updatestudent/:id', studentController.updateStudent);

// Delete a student from the database
routes.delete('/deletestudent/:id', studentController.deleteStudent);

module.exports = routes;


