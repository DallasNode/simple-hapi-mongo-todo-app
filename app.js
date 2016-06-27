'use strict';

const Hapi = require('hapi');

let port = process.env.PORT || 8000;

const server = new Hapi.Server();
server.connection({ port: port });

server.register(require('inert'), (err) => {

    if (err) {
        throw err;
    }

    server.route({
      method: 'GET',
      path: '/{param*}',
      handler: {
        directory: {
          path: 'public'
        }
      }
    });

    server.start((err) => {

        if (err) {
            throw err;
        }

        console.log('Server running at:', server.info.uri);
    });
});

require('./api/todo.js').registerApi(server);
