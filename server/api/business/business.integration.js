'use strict';

var app = require('../..');
import request from 'supertest';

var newBusiness;

describe('Business API:', function() {
  describe('GET /api/businesses', function() {
    var businesss;

    beforeEach(function(done) {
      request(app)
        .get('/api/businesses')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          businesss = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(businesss).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/businesses', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/businesses')
        .send({
          name: 'New Business',
          info: 'This is the brand new business!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newBusiness = res.body;
          done();
        });
    });

    it('should respond with the newly created business', function() {
      expect(newBusiness.name).to.equal('New Business');
      expect(newBusiness.info).to.equal('This is the brand new business!!!');
    });
  });

  describe('GET /api/businesses/:id', function() {
    var business;

    beforeEach(function(done) {
      request(app)
        .get(`/api/businesses/${newBusiness._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          business = res.body;
          done();
        });
    });

    afterEach(function() {
      business = {};
    });

    it('should respond with the requested business', function() {
      expect(business.name).to.equal('New Business');
      expect(business.info).to.equal('This is the brand new business!!!');
    });
  });

  describe('PUT /api/businesses/:id', function() {
    var updatedBusiness;

    beforeEach(function(done) {
      request(app)
        .put(`/api/businesses/${newBusiness._id}`)
        .send({
          name: 'Updated Business',
          info: 'This is the updated business!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedBusiness = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedBusiness = {};
    });

    it('should respond with the original business', function() {
      expect(updatedBusiness.name).to.equal('New Business');
      expect(updatedBusiness.info).to.equal('This is the brand new business!!!');
    });

    it('should respond with the updated business on a subsequent GET', function(done) {
      request(app)
        .get(`/api/businesses/${newBusiness._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let business = res.body;

          expect(business.name).to.equal('Updated Business');
          expect(business.info).to.equal('This is the updated business!!!');

          done();
        });
    });
  });

  describe('PATCH /api/businesses/:id', function() {
    var patchedBusiness;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/businesses/${newBusiness._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched Business' },
          { op: 'replace', path: '/info', value: 'This is the patched business!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedBusiness = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedBusiness = {};
    });

    it('should respond with the patched business', function() {
      expect(patchedBusiness.name).to.equal('Patched Business');
      expect(patchedBusiness.info).to.equal('This is the patched business!!!');
    });
  });

  describe('DELETE /api/businesses/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/businesses/${newBusiness._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when business does not exist', function(done) {
      request(app)
        .delete(`/api/businesses/${newBusiness._id}`)
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
