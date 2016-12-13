'use strict';

describe('Component: ProductComponent', function() {
  // load the controller's module
  beforeEach(module('owApp.product'));

  var ProductComponent;

  // Initialize the controller and a mock scope
  beforeEach(inject(function($componentController) {
    ProductComponent = $componentController('product', {});
  }));

  it('should ...', function() {
    expect(1).to.equal(1);
  });
});
