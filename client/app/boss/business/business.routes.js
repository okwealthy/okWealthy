'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('business', {
      url: '/boss/business',
      template: '<business></business>',
      authenticate: 'boss'
    });
}
