'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('category', {
      url: '/manager/category',
      template: '<category></category>',
      authenticate: 'manager'
    })
    

    ;
}
