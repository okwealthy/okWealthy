'use strict';
const angular = require('angular');

const uiRouter = require('angular-ui-router');

import routes from './product.routes';

export class ProductComponent {
  constructor(Product, Auth, UI, $stateParams) {
    'ngInject';

    this.$stateParams = $stateParams;

    this.Product = Product;
    this.Auth = Auth;
    this.UI = UI;

  }
  initForm(){
    this.newProduct = {
      name: '',
      info: '',
      _business: this.businessID,
      _category: this.$stateParams.categoryID,
      _remixers: [],
      _modifiers: [],
      _with: []
    };

  }

  createProduct(){
    return this.Product.http
    .create(this.newProduct)
    .then(() => {
      this.initForm();
      this.loadData();
    })
  }

  loadProduct(){
    return this.Product.http.list({
      _business: this.businessID,
      _category: this.$stateParams.categoryID
    })
    .then((data) => {
      this.products = data;
    });
  }

  removeProduct(data){

    if (data.active){
      window.alert('請先停用，讓後再刪除。\n Please disable before delete.');
      return;
    }

    if (!window.confirm() || data.active){
      return;
    }

    return this.Product.http.remove(data)
      .then(() => {
        this.loadProduct();
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
        this.Product.http.update(newData)
          .then((updatedData) => {

            // this.loadProduct();

          });
      }
    },500);
    
  }

  loadData(){
    this.isLoading = true;
    this.Auth.getCurrentUser()
      .then(() => {

        this.businessID = this.Auth.getCurrentUserSync()._business;
        this.isLoading = false;
        
        if (!this.businessID){
          return;
        }

        this.loadProduct();
        this.initForm();

      });


  }
  $onInit(){
    this.loadData();
  }
}

export default angular.module('owApp.product', [uiRouter])
  .config(routes)
  .component('product', {
    template: require('./product.html'),
    controller: ProductComponent,
    controllerAs: '$ctrl'
  })
  .name;
