'use strict';

import NProgress from 'nprogress';

export function routerDecorator($rootScope, $state, Auth) {
  'ngInject';
  // Redirect to login if route requires auth and the user is not logged in, or doesn't have required role

  // $rootScope.$on('$stateChangeSuccess', function(event, next) {
  //   setTimeout(function(){
  //     NProgress.done();
  //   },350);
  // });

  // $rootScope.$on('$stateChangeError', function(event, next) {
  //   setTimeout(function(){
  //     NProgress.done();
  //   },350);
  // });


  $rootScope.$on('$stateChangeStart', function(event, next) {
    // NProgress.start();

    if(!next.authenticate) {
      return;
    }

    if(typeof next.authenticate === 'string') {
      Auth.hasRole(next.authenticate)
        .then(has => {
          if(has) {
            return;
          }

          event.preventDefault();
          return Auth.isLoggedIn()
            .then(is => {
              $state.go(is ? 'main' : 'login');
            });
        });
    } else {
      Auth.isLoggedIn()
        .then(is => {
          if(is) {
            return;
          }

          event.preventDefault();

          $state.go('login');
        });
    }
  });
}
