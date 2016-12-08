'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var businessCtrlStub = {
  index: 'businessCtrl.index',
  show: 'businessCtrl.show',
  create: 'businessCtrl.create',
  upsert: 'businessCtrl.upsert',
  patch: 'businessCtrl.patch',
  destroy: 'businessCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var businessIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './business.controller': businessCtrlStub
});

describe('Business API Router:', function() {
  it('should return an express router instance', function() {
    expect(businessIndex).to.equal(routerStub);
  });

  describe('GET /api/businesses', function() {
    it('should route to business.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'businessCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/businesses/:id', function() {
    it('should route to business.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'businessCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/businesses', function() {
    it('should route to business.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'businessCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/businesses/:id', function() {
    it('should route to business.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'businessCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/businesses/:id', function() {
    it('should route to business.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'businessCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/businesses/:id', function() {
    it('should route to business.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'businessCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
