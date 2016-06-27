'use strict'

const Joi = require('joi');
const Boom = require('boom');
const ValidationSchema = require('./todo-validation.js');
const TodoMongo = require('./todo-mongo.js');

let get = {
  method: 'GET',
  path: '/api/todo',
  handler: function(request, response) {
    TodoMongo.get(function(mongoResult) {
      let resultArray = mongoResult.map(x => { return { id: x._id, description: x.description }; });
      response({ todos: resultArray });
    })
  }
};

let post = {
  method: 'POST',
  path: '/api/todo',
  handler: function(request, response) {

    let todo = {
      description: request.payload.description
    };

    Joi.validate(todo, ValidationSchema, function(err, value) {
      if (err) {
        response(Boom.badRequest('description required'));
      }
      else {
        TodoMongo.insert(todo, function(mongoResult) {
          response({ yippee: true });
        });
      }
    });

  }
}

let destroy = {
  method: 'DELETE',
  path: '/api/todo/{id}',
  handler: function(request, response) {
    let id = encodeURIComponent(request.params.id);
    TodoMongo.destroy(id, function(mongoResult) {
      response();
    });
  }
}


module.exports = {
  registerApi: function(server) {
    server.route(get);
    server.route(post);
    server.route(destroy);
  }
}
