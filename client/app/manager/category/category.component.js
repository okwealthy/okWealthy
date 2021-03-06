'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './category.routes';

export class CategoryComponent {
  
  constructor(Category, Auth, UI) {
    'ngInject';

    this.Category = Category;
    this.Auth = Auth;
    this.UI = UI;


  }
  initForm(){
    this.newCategory = {
      _business: this.businessID,
      name: ''
    };
  }

  createCategory(){
    return this.Category.http
    .create(this.newCategory)
    .then(() => {
      this.initForm();
      this.loadData();
    })
  }

  loadCategory(){
    return this.Category.http.list({
      _business: this.businessID
    })
    .then((data) => {
      this.categories = data;
      this.UI.category.refresh(data);
    });
  }

  removeCategory(data){

    if (data.active){
      window.alert('請先停用，讓後再刪除。\n Please disable before delete.');
      return;
    }

    if (!window.confirm() || data.active){
      return;
    }

    return this.Category.http.remove(data)
      .then(() => {
        this.loadCategory();
      });
  }


  cacheTimeout = 0;
  cacheInfo = '';
  updateInfo(data){

    var newData = {
      _id: data._id,
      name: data.name,
      active: data.active,
    };

    var newStr = JSON.stringify(newData);

    clearTimeout(this.cacheTimeout);
    this.cacheTimeout = setTimeout(() => {
      if (newStr !== this.cacheInfo){
        this.cacheInfo = newStr;
        this.Category.http.update(newData)
          .then((updatedData) => {

            // this.loadCategory();

          });
      }
    },500);
    
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

        this.loadCategory();
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
