'use strict';

describe('Component: BusinessComponent', function() {
  // load the controller's module
  beforeEach(module('owApp.business'));

  var BusinessComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    BusinessComponent = $componentController('business', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
