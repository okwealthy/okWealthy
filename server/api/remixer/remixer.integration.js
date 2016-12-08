'use strict';

var app = require('../..');
import request from 'supertest';

var newRemixer;

describe('Remixer API:', function() {
  describe('GET /api/remixers', function() {
    var remixers;

    beforeEach(function(done) {
      request(app)
        .get('/api/remixers')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          remixers = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(remixers).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/remixers', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/remixers')
        .send({
          name: 'New Remixer',
          info: 'This is the brand new remixer!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newRemixer = res.body;
          done();
        });
    });

    it('should respond with the newly created remixer', function() {
      expect(newRemixer.name).to.equal('New Remixer');
      expect(newRemixer.info).to.equal('This is the brand new remixer!!!');
    });
  });

  describe('GET /api/remixers/:id', function() {
    var remixer;

    beforeEach(function(done) {
      request(app)
        .get(`/api/remixers/${newRemixer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          remixer = res.body;
          done();
        });
    });

    afterEach(function() {
      remixer = {};
    });

    it('should respond with the requested remixer', function() {
      expect(remixer.name).to.equal('New Remixer');
      expect(remixer.info).to.equal('This is the brand new remixer!!!');
    });
  });

  describe('PUT /api/remixers/:id', function() {
    var updatedRemixer;

    beforeEach(function(done) {
      request(app)
        .put(`/api/remixers/${newRemixer._id}`)
        .send({
          name: 'Updated Remixer',
          info: 'This is the updated remixer!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedRemixer = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedRemixer = {};
    });

    it('should respond with the original remixer', function() {
      expect(updatedRemixer.name).to.equal('New Remixer');
      expect(updatedRemixer.info).to.equal('This is the brand new remixer!!!');
    });

    it('should respond with the updated remixer on a subsequent GET', function(done) {
      request(app)
        .get(`/api/remixers/${newRemixer._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let remixer = res.body;

          expect(remixer.name).to.equal('Updated Remixer');
          expect(remixer.info).to.equal('This is the updated remixer!!!');

          done();
        });
    });
  });

  describe('PATCH /api/remixers/:id', function() {
    var patchedRemixer;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/remixers/${newRemixer._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Remixer' },
          { op: 'replace', path: '/info', value: 'This is the patched remixer!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedRemixer = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedRemixer = {};
    });

    it('should respond with the patched remixer', function() {
      expect(patchedRemixer.name).to.equal('Patched Remixer');
      expect(patchedRemixer.info).to.equal('This is the patched remixer!!!');
    });
  });

  describe('DELETE /api/remixers/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/remixers/${newRemixer._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when remixer does not exist', function(done) {
      request(app)
        .delete(`/api/remixers/${newRemixer._id}`)
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
