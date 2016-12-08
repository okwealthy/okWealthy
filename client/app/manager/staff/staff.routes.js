'use strict';

export default function($stateProvider) {
  'ngInject';
  $stateProvider
    .state('staff', {
      url: '/manager/staff',
      template: '<staff></staff>',
      authenticate: 'manager'
    });
}
