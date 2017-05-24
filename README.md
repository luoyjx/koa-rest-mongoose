# koa-rest-mongoose 

[![NPM version](https://badge.fury.io/js/koa-rest-mongoose.svg)](http://badge.fury.io/js/koa-rest-mongoose) [![Dependency Status](https://gemnasium.com/luoyjx/koa-rest-mongoose.svg)](https://gemnasium.com/luojx/koa-rest-mongoose) [![Build Status](https://travis-ci.org/luoyjx/koa-rest-mongoose.svg?branch=master)](https://travis-ci.org/luoyjx/koa-rest-mongoose)

mongoose rest generator for koa

[![NPM](https://nodei.co/npm/koa-rest-mongoose.png?downloads=true)](https://nodei.co/npm/koa-rest-mongoose/)

# Installation

```shell
npm install koa-rest-mongoose
```

# Usage

```javascript
const koa = require('koa');
const mongoose = require('mongoose');
const KoaRestMongoose = require('koa-rest-mongoose');

// 1 step, mongoose
const mongoUrl = '127.0.0.1:27017/koa_rest_mongoose';
const schema = new mongoose.Schema({
  email: String,
  name: String,
  password: String,
  address: String,
  zipcode: Number,
  lists: Array
});

mongoose.connect(mongoUrl);
mongoose.model('user', schema);

// 2 step, koa and router
const app = koa();
const rest = KoaRestMongoose({
  prefix: '/api'
});
app.use(rest.routes());

// 3 step, done
app.listen(process.env.PORT || 5000);
```
# TODO feature

- [ ] middlewares support`

# API
Following REST API is now created for you:

| HTTP Verb     | /users   | /users/:id |
| ------------- | ------------- | --------------- |
| GET           | Get all documents, or documents that match the query. <br> You can use [mongoose find conditions] (http://mongoosejs.com/docs/queries.html), limit, skip and sort. <br> For example: <br> **/api/users?conditions={"name":"john"}&limit=10&skip=1&sort=-zipcode** | Get the addressed document. |
| POST          | Create a new document and send it back. |  Update the addressed document with specified attributes. |
| PUT           | Create a new document and send it back. | Replace the addressed document. |
| DELETE        | n/a | Delete the addressed document. |
| PATCH         | n/a | Update the addressed document with specified attributes. |