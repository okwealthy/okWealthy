'use strict';

export function UserResource($resource) {
  'ngInject';

  return $resource('/api/users/:id/:controller', {
    id: '@_id'
  }, {
    
    forceResetPassword: {
      url: '/api/users/:id/forceResetPassword',
      method: 'PUT',
    },

    controlUpdate:{
      method: 'PUT',
    },
    
    controlCreate:{
      url: '/api/users/panel',
      method: 'POST',
    },

    changePassword: {
      method: 'PUT',
      params: {
        controller: 'password'
      }
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    }
  });
}
