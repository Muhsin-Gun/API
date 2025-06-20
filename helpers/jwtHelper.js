const JWT = require ('jsonwebtoken');
const createError = require('http-errors');
const User = require('../models/usermodel');

module.exports ={
    signAccessToken:(UserId)=>{
        return new Promise((resolve, reject)=>{
            const payload ={}
            const secret = process.env.ACCESS_TOKEN_SECRET;
            const options={
                expiresIn:'10min',
                issuer: ' EddTechnologies.com',
                audience:UserId,
            }
            JWT.sign(payload, secret, options, (error, token)=>{
                if(error){
                    console.log(error.message)
                    reject(createError.InternalSetverError());
                }
                resolve(token);
            })
        })
    },

    //middleware to verify access token
    verifyAccessToken:(req, res, next)=>{
        if(!req.headers['authorization']) return next(creatError.Unauthorized());
        const authHeader = req.headers['authorization'];
        const bearerToken = authHeader.split(' ');
        const token = bearerToken[1];
        JWT.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, payload)=>{
            if(err){
                return next (creatError.Unauthorized())
            }
            req.payload = payload;
            next()
 })
  },
}