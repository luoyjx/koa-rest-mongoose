'use strict';

const parse = require('co-body');

module.exports = function generateActions(model) {
  return {
    *findAll(next) {
      yield next;
      const query = this.request.query;
      let conditions = {};
      let error;
      let result;
      try {
        if (query.conditions) {
          conditions = JSON.parse(query.conditions);
        }

        const builder = model.find(conditions);

        ['limit', 'skip', 'sort'].forEach((key) => {
          if (query[key]) {
            builder[key](query[key]);
          }
        });

        result = yield builder.exec();

        this.body = result;
      } catch (_error) {
        error = _error;
        this.body = error;
      }
    },

    *findById(next) {
      yield next;
      let error;
      let result;
      try {
        result = yield model.findById(this.params.id).exec();
        this.body = result;
      } catch (_error) {
        error = _error;
        this.body = error;
      }
    },

    *deleteById(next) {
      yield next;
      let error;
      let result;
      try {
        result = yield model.findByIdAndRemove(this.params.id).exec();
        this.body = result;
      } catch (_error) {
        error = _error;
        this.body = error;
      }
    },

    *replaceById(next) {
      yield next;
      const body = this.request.body || (yield parse(this));
      let error;
      let newDocument;
      let result;
      try {
        yield model.findByIdAndRemove(this.params.id).exec();
        newDocument = body;
        newDocument._id = this.params.id;
        result = yield model.create(newDocument);
        this.body = result;
      } catch (_error) {
        error = _error;
        this.body = error;
      }
    },

    *updateById(next) {
      yield next;
      let error;
      let result;
      const body = this.request.body || (yield parse(this));
      try {
        result = yield model.findByIdAndUpdate(this.params.id, body, { new: true }).exec();
        this.body = result;
      } catch (_error) {
        error = _error;
        this.body = error;
      }
    },

    *create(next) {
      yield next;
      let error;
      let result;
      const body = this.request.body || (yield parse(this));
      try {
        result = yield model.create(body);
        this.status = 201;
        this.body = result;
      } catch (_error) {
        error = _error;
        this.body = error;
      }
    }
  };
};
