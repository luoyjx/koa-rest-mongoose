'use strict';

const debug = require('debug')('koa-rest-mongoose:index.js');
const mongoose = require('mongoose');
const router = require('koa-router')();
const generateRoutes = require('./routes');
const generateActions = require('./actions');
mongoose.Promise = require('bluebird');

/**
 * @module koa-rest-mongoose
 */

module.exports = KoaRestMongoose;

/**
 * Create a KoaRestMongoose instance.
 *
 * @param {Object} options
 */
function KoaRestMongoose(options) {

  if (!(this instanceof KoaRestMongoose)) {
    return new KoaRestMongoose(options);
  }

  options = options || {};
  debug('options: ', options);

  // api url prefix
  this.prefix = null;

  if (options.prefix !== null && typeof options.prefix !== 'undefined') {
    // add `/` if not exists
    if (options.prefix.indexOf('/') === -1) {
      this.prefix = '/';
    }

    this.prefix = (this.prefix || '') + options.prefix;
    debug('prefix: ', this.prefix);
  }

  // get all mongoose models
  this.models = mongoose.models;

  const modelNames = Object.keys(this.models);

  // generate controller by mongoose model
  modelNames.map(modelName => {
    const model = this.models[modelName];
    debug('model: ', model);
    const actions = generateActions(model);
    // generate route and bind to router
    generateRoutes(router, model.modelName, actions, this.prefix);
  });

  // router instance
  this.router = router;

  // get all routes
  this.routes = () => {
    return this.router.routes();
  };
}
