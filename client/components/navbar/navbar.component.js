'use strict';
/* eslint no-sync: 0 */

import angular from 'angular';

export class NavbarComponent {
  menu = [{
    title: 'Home',
    state: 'main'
  }];

  isCollapsed = true;

  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {
    login: undefined
  };
  submitted = false;

  constructor(Auth, $state, UI, Trans) {
    'ngInject';

    this.$state = $state;
    this.UI = UI;

    this.Trans = Trans;
    this.Auth = Auth;

    this.isLoggedIn = Auth.isLoggedInSync;
    this.isAdmin = Auth.isAdminSync;
    this.getCurrentUser = Auth.getCurrentUserSync;

    this.loadData();

  }

  loadData(){
    this.Auth.getCurrentUser()
      .then(() => {

        this.isAdmin = this.Auth.hasRoleSync('admin');
        this.isBoss = this.Auth.hasRoleSync('boss');
        this.isManager = this.Auth.hasRoleSync('manager');
        this.isStaff = this.Auth.hasRoleSync('staff');
        this.isUser = this.Auth.hasRoleSync('user');
        

      });
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
          
          this.loadData();

        })
        .catch(err => {
          this.errors.login = err.message;
        });
    }
  }



}

export default angular.module('directives.navbar', [])
  .component('navbar', {
    template: require('./navbar.html'),
    controller: NavbarComponent
  })
  .name;
