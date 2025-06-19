const { authSchema } = require("../helpers/validationSchema");
const User = require("../models/usermodel");
const createError = require("http-errors"); 

module.exports = {
  register: async (req, res, next) => {
  
    try {
      const result = await authSchema.validateAsync(req.body);

      const Exists = await User.findOne({ email: result.email });

      if (Exists) throw createError.Conflict(`${result.email} has already been registered`);
      
      const user = new User(result);
      const savedUser = await user.save();

      res.send(savedUser);
    } catch (error) {
      if (error.isJoi === true) error.status = 422;
      next(error);
    }
  }
};