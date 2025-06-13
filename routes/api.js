
const express = require("express");
const routes = express.Router();
const Student = require("../models/studentmodels");

// Get a list of students from the database
routes.get('/students', (req, res) => {
    res.send({ type: 'Get Request' });
});

// Add a student to the database
routes.post('/students', async (req, res, next) => {
    try {
        const student = new Student(req.body);
        const result = await student.save();
        res.send(result);
    } catch (error) {
        console.log(error.message);
       
    }
});

// Update a student in the database
routes.put('/students/:id', (req, res) => {
    res.send({ type: 'Update Request' });
});

// Delete a student from the database
routes.delete('/students/:id', async(req, res) => {
    const id = req.params.id
    try {
        const student = await Student.findByIdAndDelete(id) 
        res.send(student);
    } catch (error) {
        console.log(error.message);
    }
});
routes.patch('/students/:id', async (req, res, next)=> {
    try {
        const id = req.params.id;
        const update = req.body;
        const options ={new: true}
        const result = await Student.findByIdAndUpdate(id, update, options)

        res.send(result);

    } catch (error) {
        console.log(error.message)
    }
});
module.exports = routes;


