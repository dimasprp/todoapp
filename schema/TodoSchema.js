const Joi  = require('joi')

const create = 
   { body:Joi.object().keys({
        title: Joi.string().max(50).required(),
        description: Joi.string().max(150).required(),
})}

const update = {
    body:Joi.object().keys({
        title: Joi.string().max(50),
        description: Joi.string().max(150),
})}

module.exports = { create,update }