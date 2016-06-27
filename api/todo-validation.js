'use strict'

const Joi = require('joi');

var schema = Joi.object().keys({
    description: Joi.string().min(3).required()
});

module.exports = schema;
