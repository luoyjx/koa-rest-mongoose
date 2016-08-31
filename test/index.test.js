/**
 * test - index.js
 * @authors luoyjx (yjk99@qq.com)
 * @date    2016-08-29 22:37:50
 */

var server = require('./server');
var model = server.model;
var request = require('supertest').agent(server.listen());

var users = [
  {
    name: 'Fronk',
    age : 28,
    _id : 1
  },
  {
    name: 'Joff',
    age : 27,
    _id : 2
  },
  {
    name: 'Scoobert',
    age : 54,
    _id : 3  
  }
];

describe('koa rest mongoose', function() {
  
  describe('routes', function(){

    beforeEach(function *() {
      var saveGroup = [];

      for ( var i = 0, len = users.length; i < len; i++) {
        yield saveGroup.push(users[i]);
      }
    })

    afterEach(function(done) {
      model.remove({}, function (){
        done();
      });
    })

    describe('GET', function() {

      describe('GET /:model', function() {
        
        it('should respond with JSON for all records', function(done) {
          request
            .get('/user')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect(users)
            .end(done);
        })

      })

      describe('GET /:model/:id', function() {
        it('should respond with JSON for the record with the specified id', function(done) {
          request
            .get('/user/2')
            .expect(200)
            .expect('Content-Type', /json/)
            .expect({
              name : 'Joff',
              age  :  27,
              _id  :  2
            })
            .end(done);
        })
      })
    })
    

    describe('POST', function(){

      describe('POST /:model', function() {
        it('should respond with JSON for the created record', function(done) {
          request
            .post('/user')
            .send({
              name : 'James',
              age  :  40,
              _id  :  4
            })
            .expect(201)
            .expect({
              name : 'James',
              age  : 40,
              _id  : 4
            })
            .end(done)
        });
      });

      describe('POST /:model/:id', function() {
        it('should respond with JSON for the updated record', function(done) {
          request
            .post('/user/2')
            .send({
              age : 28
            })
            .expect(200)
            .expect({
              name : 'Joff',
              age  : 28,
              _id  : 2
            })
            .end(done)
        });
      });
    })

    describe('DELETE', function() {

      describe('DELETE /:model/:id', function() {
        it('should respond with JSON for the destroyed record', function(done) {
          request
            .del('/user/2')
            .expect(200)
            .expect({
              name : 'Joff',
              age  : 27,
              _id  : 2
            })
            .end(done)
        });
      });

    });

    describe('PUT', function() {

      describe('PUT /:model', function() {
        it('should respond with JSON for the created record', function(done) {
          request
            .put('/user')
            .send({
              name : 'John',
              age  : 26,
              _id  : 5
            })
            .expect(201)
            .expect({
              name : 'John',
              age  : 26,
              _id  : 5
            })
            .end(done)
        });
      });

      describe('PUT /:model/:id', function() {
        it('should return JSON for the replaced record', function(done) {
          request
            .put('/user/2')
            .send({
              name : 'Joseph',
              age  : 37
            })
            .expect(200)
            .expect({
              name : 'Joseph',
              age  : 37,
              _id  : 2
            })
            .end(done)
        });
      });

    });

    describe('PATCH', function() {

      describe('PATCH /:model/:id', function() {
        it('should respond with JSON for the updated record', function(done) {
          request
            .patch('/user/2')
            .send({
              age : 28
            })
            .expect(200)
            .expect({
              name : 'Joff',
              age  : 28,
              _id  : 2
            })
            .end(done)
        });
      });
    });


    after(function(done) {
      model.db.close(done);
    })

  })

})