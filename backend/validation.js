const joi = require('joi');

//Register Validation

const registerValidation = (data) => {
    const schema = joi.object({
        name: joi.string().min(6).required(),
        email: joi.string().min(8).required().email(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(data, schema)
};

const loginValidation = (data) => {
    const schema = joi.object({
        email: joi.string().min(8).required().email(),
        password: joi.string().min(8).required(),
    });
    return schema.validate(data, schema)
};


module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;

