# Building Sites with Hapi

## Initial Files
* package.json, server file, .gitignore

## Basic Static File Server

* Install hapi
* Install inert
* `npm start`

## Deploying To Heroku

* Using Heroku's port
* Creating Heroku app

## Creating a Basic JSON api

* Create a basic GET and POST api
* POST with CURL - `curl --data "description=wat" http://localhost:8000/api/todo`

## Adding PUT and DELETE to the api

* Add PUT and DELETE
* PUT with CURL - `curl -X PUT -d isComplete=false -d description=new http://localhost:8000/api/todo/538350`
