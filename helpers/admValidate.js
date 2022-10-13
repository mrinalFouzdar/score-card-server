const Joi = require("joi");

// const validateUser =(user)=>{

// }

module.exports = {
    validateBody:(schema)=>{
        return (req,resp,next)=>{
            const { error, value } = Joi.validate(req.body,schema,{abortEarly:false});
            if(error){
                console.log(error);
            }
        }
    },
    schemas:{
        authSchemas: Joi.object().keys({
            username: Joi.string().required().alphanum().min(4).max(12),
            password: Joi.string().min(4).alphanum().required()
        })
    }
}