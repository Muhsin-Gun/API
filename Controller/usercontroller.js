const { authSchema } = require("../helpers/validationSchema");
const User = require("../models/usermodel");
const createError = require("http-errors"); 
const {signAccessToken} = require("../helpers/jwtHelper")

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
  },

 login: async (req, res, next) => {
    try {
      const result = await authSchema.validateAsync(req.body);

      const user = await User.findOne({ email: result.email });
      if (!user) throw createError.NotFound("User not registered");

      const isMatch = await user.isValidPassword(result.password);
      if (!isMatch) throw createError.Unauthorized("Username/Password not valid");

      const accessToken = await signAccessToken(user.id);

      res.send({ accessToken }); 
    } catch (error) {
      if (error.isJoi === true)
        return next(createError.BadRequest("Invalid username/password")); 
      next(error);
    }
  }
};