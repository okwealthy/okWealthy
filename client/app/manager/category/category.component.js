'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './category.routes';

export class CategoryComponent {
  
  constructor(Category, Auth) {
    'ngInject';

    this.Category = Category;
    this.Auth = Auth;


  }
  initForm(){
    this.newCategory = {
      _business: this.businessID,
      
    };
  }

  createCategory(){
    return this.Category.create(this.newCategory)
    .then(() => {
      this.loadData();
    })
  }

  loadData(){
    this.isLoading = true;
    this.Auth.getCurrentUser()
      .then(() => {

        this.isLoading = false;
        this.businessID = this.Auth.getCurrentUserSync()._business;
        
        if (!this.businessID){
          return;
        }

        this.initForm();

      });


  }
  $onInit(){
    this.loadData();
  }



}

export default angular.module('owApp.category', [uiRouter])
  .config(routes)
  .component('category', {
    template: require('./category.html'),
    controller: CategoryComponent,
    controllerAs: '$ctrl'
  })
  .name;
