'use strict'

var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

const Url = 'mongodb://localhost:27017/';
const CollectionKey = 'todo';

function connect(callback) {
  MongoClient.connect(Url + CollectionKey, function(err, db) {
    callback(db);
  });
}


let insertTodo = function(todo, callback) {
  connect(function(db) {
    let collection = db.collection(CollectionKey);

    collection.insert(todo, function(err, result) {
      db.close();
      callback(result);
    });
  });
}

let getTodos = function(callback) {
  connect(function(db) {
    let collection = db.collection(CollectionKey);
    collection.find({}).toArray(function(err, todos) {
      db.close();
      callback(todos);
    });
  });
}

let deleteTodo = function(id, callback) {
  connect(function(db) {
    let collection = db.collection(CollectionKey);

    collection.deleteOne({ "_id": ObjectId(id) }, function(err, result) {
      db.close();
      callback(result);
    });
  });
}


module.exports = {
  get: getTodos,
  insert: insertTodo,
  destroy: deleteTodo
}
