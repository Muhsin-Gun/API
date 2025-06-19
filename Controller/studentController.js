const Student = require("../models/studentmodels");
const createError = require("http-errors");
module.exports = {
    addStudent: async (req, res, next) => {
        try {
            const student = new Student(req.body);
            const result = await student.save();
            res.send(result);
        } catch (error) {
            console.log(error.message);
            if(errror.name === "ValidationError"){
                next(createError(422, error.message))
                return;
            }
            next(error)
        }
    },
    
    getStudent: async(req, res, next) => {
        const id = req.params.id;
        try {
            const student = await Student.findById(id)
            if(!student){
                throw(createError(404, "student does not exist"))
            }
            res.send(student)
        } catch (error) {
            console.log(error.message);
            if(error instanceof mongoose.CastError){
                next(createError(400, "Invalid student id"));
                return;
            }
            next(error);
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

    deleteStudent: async (req, res, next) => {
        const id = req.params.id;
        try {
            const student = await Student.findByIdAndDelete(id);
            if(!student){
                throw(createError(404,"student does not exist"))
            }
            res.send(student);
        } catch (error) {
            console.log(error.message)
            if(error instanceof mongoose.CastError){
                next(createError(400, "Invalid student id"));
                return;
            }
        }
    },

    updateStudent: async (req, res, next) => {
        try {
            const id = req.params.id;
            const update = req.body;
            const options = { new: true };
            const result = await Student.findByIdAndUpdate(id, update, options);

            if(!result){
                throw(createError(404, "student does not exist"))
            }
            res.send(result);
        } catch (error) {
            console.log(error.message)

            if(error instanceof mongoose.CastError){
                return next (createError (400, "invalid student id"));    
            }
        }
    },
}