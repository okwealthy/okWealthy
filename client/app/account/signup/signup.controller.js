'use strict';

import angular from 'angular';


export default class SignupController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;


  constructor(Auth, $state, Trans, $window) {
    'ngInject';

    this.$window = $window;
    this.Trans = Trans;

    this.Auth = Auth;
    this.$state = $state;
  }


  oAuth(provider){
    this.$window.location.href = `/auth/${provider}`;
  }


  register(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Auth.createUser({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          err = err.data;
          this.errors = {};
          // Update validity of form fields that match the mongoose errors
          angular.forEach(err.errors, (error, field) => {
            form[field].$setValidity('mongoose', false);
            this.errors[field] = error.message;
          });
        });
    }
  }



}
