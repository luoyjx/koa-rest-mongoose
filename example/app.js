/**
 * example - app.js
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-08-29 23:41:04
 */

var koa = require('koa');
var router = require('koa-router')();

var koaRestMongoose = require('../lib/index');

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
