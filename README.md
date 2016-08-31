# koa-rest-mongoose [![NPM version](https://badge.fury.io/js/koa-rest-mongoose.svg)](http://badge.fury.io/js/koa-rest-mongoose) 
[![Dependency Status](https://gemnasium.com/luoyjx/koa-rest-mongoose.svg)](https://gemnasium.com/luojx/koa-rest-mongoose) 
[![Build Status](https://travis-ci.org/luoyjx/koa-rest-mongoose.svg?branch=master)](https://travis-ci.org/luoyjx/koa-rest-mongoose)

mongoose rest generator for koa

[![NPM](https://nodei.co/npm/koa-rest-mongoose.png?downloads=true)](https://nodei.co/npm/koa-rest-mongoose/)

# Installation
Install using npm:
`npm install koa-rest-mongoose`

# example

```
var koa = require('koa');
var router = require('koa-router')();

var koaRestMongoose = require('koa-rest-mongoose');

var mongoUrl = '127.0.0.1:27017/koa_rest_mongoose';
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);

var schema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  zipcode: Number,
  lists: Array
});

var model = mongoose.model('user', schema);

var app = koa();

koaRestMongoose(app, router, model, '/api');

app.listen(process.env.PORT || 5000);
```

Following REST API is now created for you:

| HTTP Verb     | /users   | /users/:id |
| ------------- | ------------- | --------------- |
| GET           | Get all documents, or documents that match the query. <br> You can use [mongoose find conditions] (http://mongoosejs.com/docs/queries.html), limit, skip and sort. <br> For example: <br> **/api/users?conditions={"name":"john"}&limit=10&skip=1&sort=-zipcode** | Get the addressed document. |
| POST          | Create a new document and send it back. |  Update the addressed document with specified attributes. |
| PUT           | Create a new document and send it back. | Replace the addressed document. |
| DELETE        | n/a | Delete the addressed document. |
| PATCH         | n/a | Update the addressed document with specified attributes. |