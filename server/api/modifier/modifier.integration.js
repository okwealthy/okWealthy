'use strict';

var app = require('../..');
import request from 'supertest';

var newModifier;

describe('Modifier API:', function() {
  describe('GET /api/modifiers', function() {
    var modifiers;

    beforeEach(function(done) {
      request(app)
        .get('/api/modifiers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          modifiers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(modifiers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/modifiers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/modifiers')
        .send({
          name: 'New Modifier',
          info: 'This is the brand new modifier!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newModifier = res.body;
          done();
        });
    });

    it('should respond with the newly created modifier', function() {
      expect(newModifier.name).to.equal('New Modifier');
      expect(newModifier.info).to.equal('This is the brand new modifier!!!');
    });
  });

  describe('GET /api/modifiers/:id', function() {
    var modifier;

    beforeEach(function(done) {
      request(app)
        .get(`/api/modifiers/${newModifier._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          modifier = res.body;
          done();
        });
    });

    afterEach(function() {
      modifier = {};
    });

    it('should respond with the requested modifier', function() {
      expect(modifier.name).to.equal('New Modifier');
      expect(modifier.info).to.equal('This is the brand new modifier!!!');
    });
  });

  describe('PUT /api/modifiers/:id', function() {
    var updatedModifier;

    beforeEach(function(done) {
      request(app)
        .put(`/api/modifiers/${newModifier._id}`)
        .send({
          name: 'Updated Modifier',
          info: 'This is the updated modifier!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedModifier = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedModifier = {};
    });

    it('should respond with the original modifier', function() {
      expect(updatedModifier.name).to.equal('New Modifier');
      expect(updatedModifier.info).to.equal('This is the brand new modifier!!!');
    });

    it('should respond with the updated modifier on a subsequent GET', function(done) {
      request(app)
        .get(`/api/modifiers/${newModifier._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let modifier = res.body;

          expect(modifier.name).to.equal('Updated Modifier');
          expect(modifier.info).to.equal('This is the updated modifier!!!');

          done();
        });
    });
  });

  describe('PATCH /api/modifiers/:id', function() {
    var patchedModifier;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/modifiers/${newModifier._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Modifier' },
          { op: 'replace', path: '/info', value: 'This is the patched modifier!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedModifier = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedModifier = {};
    });

    it('should respond with the patched modifier', function() {
      expect(patchedModifier.name).to.equal('Patched Modifier');
      expect(patchedModifier.info).to.equal('This is the patched modifier!!!');
    });
  });

  describe('DELETE /api/modifiers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/modifiers/${newModifier._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when modifier does not exist', function(done) {
      request(app)
        .delete(`/api/modifiers/${newModifier._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
