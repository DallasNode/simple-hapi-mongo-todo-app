'use strict'

let todos = []

let get = {
  method: 'GET',
  path: '/api/todo',
  handler: function(request, response) {
    response({ todos: todos });
  }
};

let post = {
  method: 'POST',
  path: '/api/todo',
  handler: function(request, response) {

    let description = request.payload.description;
    let id = Math.ceil(Math.random() * 1000000); //Hack till we make this run on Mongo

    todos.push({
      id: id,
      description: description,
      isComplete: false
    });

    response({ id: id })
  }
}

module.exports = {
  registerApi: function(server) {
    server.route(get);
    server.route(post);
  }
}
