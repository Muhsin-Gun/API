const Student = require("../models/studentmodels");
module.exports = {
    addStudent: async (req, res, next) => {
        try {
            const student = new Student(req.body);
            const result = await student.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },

    getAllStudents: async (req, res) => { 
        try {
            const students = await Student.find({});
            res.send(students);
        } catch (error) {
            console.log(error.message);
        }
    },

    deleteStudent: async (req, res) => {
        const id = req.params.id;
        try {
            const student = await Student.findByIdAndDelete(id);
            res.send(student);
        } catch (error) {
            console.log(error.message);
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const options = { new: true };
            const result = await Student.findByIdAndUpdate(id, update, options);
            res.send(result);
        } catch (error) {
            console.log(error.message);
        }
    },
}