'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './business.routes';

export class BusinessComponent {
  

  constructor(Business, Auth) {
    'ngInject';

    this.Business = Business;
    this.Auth = Auth;
    this.filterActive = true;

  }

  initFormData(){
    this.newBusiness = {
      name: '',
      info: '',
      _owners: [this.Auth.getCurrentUserSync()._id]
    };
  }

  filterActive(data){
    data = data || [];
    return data.filter(function(item){
      return item.active;
    });
  }

  loadData(){
    return this.Business.http.my()
      .then(data => {
        this.businesses = data;//this.filterActive();
      });
  }

  resetForm(){
    this.initFormData();
  }

  $onInit(){
    this.loadData()
      .then(() => {
        this.initFormData();
      });
  }

  createBusiness(){
    this.Business.http.create(this.newBusiness)
      .then(() => {
        window.location.reload();
        this.$onInit();
      });
  }


  trashBusiness(business){

    if (!window.confirm()){
      return;
    }

    business.active = false;

    this.Business.http.update(business)
      .then(() => {
        this.loadData();
      });
  }

  restoreBusiness(business){

    business.active = true;
    this.filterActive = true;

    this.Business.http.update(business)
      .then(() => {
        this.loadData();
      });
  }

  selectBusiness(business){
    this.selectedBusiness = business;
  }

  updateSelectedBusiness(business){

    if ( !(business && business._id) ){
      return;
    }

    this.selectedBusiness = null;
    this.Business.http.update(business)
      .then(() => {
        this.loadData();
      });
  }


}

export default angular.module('owApp.business', [uiRouter])
  .config(routes)
  .component('business', {
    template: require('./business.html'),
    controller: BusinessComponent,
    controllerAs: '$business'
  })
  .name;
