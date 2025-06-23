
const express = require("express");
const routes = express.Router();
const { verifyAccessToken } = require("../helpers/jwtHelper");

const studentcontroller = require ("../Controller/studentcontroller");
// Get a list of students from the database
routes.get('/getStudents',verifyAccessToken,studentcontroller.getAllStudents );
routes.get('/getStudent',verifyAccessToken,studentcontroller.getStudent);
// Add a student to the database
routes.post('/addStudent', studentcontroller.addStudent);

// Update a student in the database
// routes.put('/students/:id', (req, res) => {
//     res.send({ type: 'Update Request' });
// });

// Delete a student from the database
routes.delete('/deleteStudents/:id',verifyAccessToken,studentcontroller.deleteStudent);
routes.patch('/updateStudents/:id',verifyAccessToken,studentcontroller.updateStudent );
module.exports = routes;


