'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('user', {
      url: '/admin/user',
      template: '<user></user>',
	  authenticate: 'admin'
    });
}
