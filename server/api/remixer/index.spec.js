'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var remixerCtrlStub = {
  index: 'remixerCtrl.index',
  show: 'remixerCtrl.show',
  create: 'remixerCtrl.create',
  upsert: 'remixerCtrl.upsert',
  patch: 'remixerCtrl.patch',
  destroy: 'remixerCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var remixerIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './remixer.controller': remixerCtrlStub
});

describe('Remixer API Router:', function() {
  it('should return an express router instance', function() {
    expect(remixerIndex).to.equal(routerStub);
  });

  describe('GET /api/remixers', function() {
    it('should route to remixer.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'remixerCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/remixers/:id', function() {
    it('should route to remixer.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'remixerCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/remixers', function() {
    it('should route to remixer.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'remixerCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/remixers/:id', function() {
    it('should route to remixer.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'remixerCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/remixers/:id', function() {
    it('should route to remixer.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'remixerCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/remixers/:id', function() {
    it('should route to remixer.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'remixerCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
