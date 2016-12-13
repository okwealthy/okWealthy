'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './user.routes';

export class UserComponent {
  
  user = {
    name: '',
    email: '',
    password: ''
  };
  errors = {};
  submitted = false;



  constructor(Admin, Auth, $scope, $q) {
    'ngInject';

    this.$q = $q;

    this.Admin = Admin;
    this.Auth = Auth;

    this.passwordTemplate = `
      <div class="ui-grid-cell-contents" ng-if="row.entity.provider === 'local'">
        <input style="width: 50px;" autocomplete="off" type="password" ng-model="row.entity.newPassword">
        <button ng-click="grid.appScope.forceResetPassword(row.entity)" class="btn btn-warning btn-xs">{{ 'ui.update' | translate }} {{ 'ui.password' | translate }}</button>
      </div>
    `;

    this.roleTemplate = `
      <div class="ui-grid-cell-contents">
        <select ng-model="row.entity.role" ng-change="grid.appScope.changeRole(row.entity)">
          <option value="user" ng-if="row.entity._id !== grid.appScope.myID">{{  'ui.user' | translate }}</option>
          <option value="staff" ng-if="row.entity._id !== grid.appScope.myID">{{ 'ui.staff' | translate }}</option>
          <option value="manager" ng-if="row.entity._id !== grid.appScope.myID">{{ 'ui.manager' | translate }}</option>
          <option value="boss" ng-if="row.entity._id !== grid.appScope.myID">{{ 'ui.boss' | translate }}</option>
          <option value="admin">{{ 'ui.admin' | translate }}</option>
        </select>
      </div>
    `;

    this.activeTemplate = `
      <div class="ui-grid-cell-contents">
        
        <input type="checkbox" ng-model="row.entity.active" ng-change="grid.appScope.saveRow(row.entity)">

      </div>
    `;

    this.removeTemplate = `
      <div class="ui-grid-cell-contents">
        
        <button ng-if="row.entity._id !== grid.appScope.myID" ng-click="grid.appScope.deleteUser(row.entity)" class="btn btn-danger btn-xs">{{ 'ui.delete' | translate }} {{ 'ui.user' | translate }}</button>

      </div>
    `;

    this.userColumn = [
      { field: 'active', displayName: '✔︎', enableCellEdit: true, width: '8%', cellTemplate: this.activeTemplate, editableCellTemplate: this.activeTemplate  },
      { field: 'removeUser', displayName: 'Remove', enableCellEdit: true, width: '13%', cellTemplate: this.removeTemplate, editableCellTemplate: this.removeTemplate  },
      { field: 'name', displayName: 'Name', enableCellEdit: true,  },
      { field: 'email', displayName: 'Email', enableCellEdit: true,  },
      { field: 'role', displayName: 'Role', enableCellEdit: true, width: '13%', cellTemplate: this.roleTemplate, editableCellTemplate: this.roleTemplate },
      { field: 'newPassword', displayName: 'New Password', width: '25%', enableCellEdit: true,  cellTemplate: this.passwordTemplate, editableCellTemplate: this.passwordTemplate },
    ];

    this.userGrid = {
      data: [],
      appScopeProvider: this,
      columnDefs: this.userColumn,
      enableCellEditOnFocus: true,
      
      enableFiltering: true,
      onRegisterApi: function(gridApi){
        this.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow($scope, this.saveRow.bind(this));
      }.bind(this)
    };

  }


  saveRow( rowEntity ) {
    // create a fake promise - normally you'd use the promise returned by $http or $resource
    var promise = this.$q.defer();
    this.gridApi.rowEdit.setSavePromise( rowEntity, promise.promise );

    this.Admin.http.update({
      _id: rowEntity._id,
      name: rowEntity.name,
      email: rowEntity.email,
      active: rowEntity.active,
    })
      .then(function(){
        promise.resolve();
      }.bind(this), function(){
        promise.reject();
      }.bind(this));

    return promise;
  }


  loadData(){
    return this.Admin.http.list()
      .then(data => {

        this.users = data;
        this.userGrid.data = data;

        this.myID = this.Auth.getCurrentUserSync()._id;

      });
  }

  $onInit(){
    this.loadData();
  }

  deleteUser(data){

    if (data.active){
      return;
    }

    if (!window.confirm()){
      return;
    }

    this.Admin.http.delete(data)
      .then(() => {
        this.loadData();
      });
  }

  changeRole(data){
    this.Admin.http.changeRole(data)
      .then(() => {
        this.loadData();
      });
  }

  forceResetPassword(data){
    this.Admin.http.forceResetPassword(data)
      .then(() => {
        this.loadData();
      });
  }



  register(form) {
    this.submitted = true;

    if(form.$valid) {
      return this.Admin.http.create({
        name: this.user.name,
        email: this.user.email,
        password: this.user.password
      })
        .then(() => {
          // Account created, redirect to home
          // this.$state.go('main');
          
          this.loadData()
            .then(function(){

              this.tabID = '2';

            }.bind(this));

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

export default angular.module('owApp.user', [uiRouter])
  .config(routes)
  .component('user', {
    template: require('./user.html'),
    controller: UserComponent,
    controllerAs: 'vm'
  })
  .name;
