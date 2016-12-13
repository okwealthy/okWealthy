'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('product', {
      url: '/manager/category/:categoryID/product',
      template: '<product></product>',
      authenticate: 'manager'
    });
}
