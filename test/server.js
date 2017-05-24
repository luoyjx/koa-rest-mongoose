'use strict';
/**
 * test - server.js
 * @authors yanjixiong
 * @date    2016-08-30 11:04:51
 */

const koa = require('koa');
const mongoose = require('mongoose');
const KoaRestMongoose = require('../lib/index');

const mongoUrl = '127.0.0.1:27017/koa_rest_mongoose';

// mongoose
mongoose.connect(mongoUrl);

const schema = new mongoose.Schema({
  name: String,
  age: Number,
  _id: Number
}, { versionKey: false });

mongoose.model('user', schema);

// koa
const app = koa();

const restMongoose = new KoaRestMongoose();

app.use(restMongoose.routes());

app.models = restMongoose.models;

module.exports = app;
