'use strict';


export default class LoginController {
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;


  constructor(Auth, $state, Trans, $window) {
    'ngInject';

   

    this.$window = $window;

    this.Auth = Auth;
    this.$state = $state;
    this.Trans = Trans;
  }


  oAuth(provider){
    this.$window.location.href = `/auth/${provider}`;
  }

  login(form) {
    this.submitted = true;

    if(form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Logged in, redirect to home
          this.$state.go('main');
        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }
}
