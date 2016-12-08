'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var modifierCtrlStub = {
  index: 'modifierCtrl.index',
  show: 'modifierCtrl.show',
  create: 'modifierCtrl.create',
  upsert: 'modifierCtrl.upsert',
  patch: 'modifierCtrl.patch',
  destroy: 'modifierCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var modifierIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './modifier.controller': modifierCtrlStub
});

describe('Modifier API Router:', function() {
  it('should return an express router instance', function() {
    expect(modifierIndex).to.equal(routerStub);
  });

  describe('GET /api/modifiers', function() {
    it('should route to modifier.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'modifierCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/modifiers/:id', function() {
    it('should route to modifier.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'modifierCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/modifiers', function() {
    it('should route to modifier.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'modifierCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/modifiers/:id', function() {
    it('should route to modifier.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'modifierCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/modifiers/:id', function() {
    it('should route to modifier.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'modifierCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/modifiers/:id', function() {
    it('should route to modifier.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'modifierCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
