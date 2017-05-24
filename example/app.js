'use strict';

const koa = require('koa');
const mongoose = require('mongoose');
const KoaRestMongoose = require('../lib/index');

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

const app = koa();

const rest = KoaRestMongoose({
  prefix: '/api'
});
app.use(rest.routes());

app.listen(process.env.PORT || 5000);
