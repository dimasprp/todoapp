const  Joi = require('joi')

const login = {
    body:Joi.object().keys({
        email: Joi.string().email().max(100).required(),
        password: Joi.string().min(6).required()
    })
}


module.exports = { login }