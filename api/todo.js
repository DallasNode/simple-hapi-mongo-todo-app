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

let put = {
  method: 'PUT',
  path: '/api/todo/{id}',
  handler: function(request, response) {
    let id = encodeURIComponent(request.params.id);
    let description = request.payload.description;
    let isComplete = request.payload.isComplete || false;

    let first = todos.find(x => { return x.id == id; });
    if (first) {
      first.description = description;
      first.isComplete = isComplete;
    }

    response();
  }
}

let destroy = {
  method: 'DELETE',
  path: '/api/todo/{id}',
  handler: function(request, response) {
    let id = encodeURIComponent(request.params.id);
    let index = todos.findIndex(x => { return x.id == id; });
    
    if (index > -1) {
      todos.splice(index, 1);
    }
    response();
  }
}


module.exports = {
  registerApi: function(server) {
    server.route(get);
    server.route(post);
    server.route(put);
    server.route(destroy);
  }
}
