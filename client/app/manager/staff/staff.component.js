'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './staff.routes';

export class StaffComponent {
  constructor(Business, Auth, Staff, User, $state) {
    'ngInject';

    this.User = User;
    this.Business = Business;
    this.Staff = Staff;
    this.Auth = Auth;

    this.filterActive = true;

    this.businesses = [];
  }

  filterOutOwner(data){
    var currentUser = this.Auth.getCurrentUserSync();
    data = data || [];

    return data.filter(function(item){
      return item._id !== currentUser._id;
    });
  }

  loadStaff(){
    return this.Staff.http.list({
      _business: this.businessID
    })
    .then(data => {
      this.staff = this.filterOutOwner(data);
    });
  }

  cacheTimeout = 0;
  cacheInfo = '';
  updateInfo(data){

    var newData = {
      _id: data._id,
      name: data.name,
      email: data.email,
      active: data.active,
    };

    var newStr = JSON.stringify(newData);

    clearTimeout(this.cacheTimeout);
    this.cacheTimeout = setTimeout(() => {
      if (newStr !== this.cacheInfo){
        this.cacheInfo = newStr;
        this.Staff.http.update(newData);
      }
    },500);
    
  }


  loadData(){

    this.isLoading = true;

    return this.Auth.getCurrentUser()
      .then(() => {

        this.isLoading = false;
        this.businessID = this.Auth.getCurrentUserSync()._business;
      })
      .then(() => {

        if (!this.businessID){
          return;
        }

        return this.loadStaff();
      });

  }

  $onInit(){
    this.loadData();
    this.initFormData();
  }

  initFormData(){
    this.errors = {};
    this.submitted = false;
    this.newStaff = {
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    };
  }

  cancelForm(){
    window.location.reload();
  }

  deleteStaff(staff){

    if (!window.confirm()){
      return;
    }

    this.Staff.http.delete(staff)
      .then(function(){
        this.loadStaff();
      }.bind(this));

  }

  changeRole(user){

    this.Staff.http.changeRole(user)
      .then(function(){
        this.loadData();
      }.bind(this));

  }

  forceResetPassword(user){

    if (!user.newPassword || user.newPassword === null || user.newPassword === ''){
      return;
    }

    if (!window.confirm('Reset Password?')){
      return;
    }

    this.Staff.http.forceResetPassword(user)
      .then(function(){
        this.loadData();
      }.bind(this));

  }

  createStaff(form){

    this.submitted = true;

    if(form.$valid) {

      this.Staff.http
        .create({
          name: this.newStaff.name,
          email: this.newStaff.email,
          password: this.newStaff.password,
          // _business: this.businessID
          //server set the rights.
        })
        .then(function(){
          this.initFormData();
          this.loadData();
        }.bind(this), function(err){

            err = err.data;
            this.errors = {};
            // Update validity of form fields that match the mongoose errors
            angular.forEach(err.errors, function(error, field)  {
              form[field].$setValidity('mongoose', false);
              this.errors[field] = error.message;
            }.bind(this));

        }.bind(this));
    }

  }

}

export default angular.module('owApp.staff', [uiRouter])
  .config(routes)
  .component('staff', {
    template: require('./staff.html'),
    controller: StaffComponent,
    controllerAs: '$staff'
  })
  .name;
