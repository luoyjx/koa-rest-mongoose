/**
 * test - server.js
 * @authors yanjixiong
 * @date    2016-08-30 11:04:51
 */

var koa = require('koa');
var router = require('koa-router')();

var koaRestMongoose = require('../lib/index');

var mongoUrl = '127.0.0.1:27017/koa_rest_mongoose';
var mongoose = require('mongoose');
mongoose.connect(mongoUrl);

var app = koa();

var schema = new mongoose.Schema({
  name: String,
  age: Number,
  _id: Number
}, {versionKey: false});

var model = app.model = mongoose.model('user', schema);

koaRestMongoose(app, router, model);

module.exports = app;