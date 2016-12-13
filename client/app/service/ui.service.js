'use strict';
const angular = require('angular');

export default angular.module('owApp.ui', [])



.directive('sidebarOpen', function(UI){
    'ngInject';

    return {
      restrict: 'A',
      link: function(scope, element, attrs){

        UI.sidebar.hook = function(){
          if (UI.sidebar.open){
            element.addClass('sidebar-open');
          }else{
            element.removeClass('sidebar-open');
          } 
        };
      
      }
    };

})

.service('UI', function(Auth, Category){
	'ngInject';
      
    var menu = ['flag', 'bell', 'mail', 'profile', 'rightbar'];

    this.sidebar = {};
    this.sidebar.open = false;
    this.sidebar.toggle = function(){

      this.sidebar.open = !this.sidebar.open;

      menu.forEach(function(item){
        this[item].open = false;
      }.bind(this));
  
      if (this.sidebar.hook){
        this.sidebar.hook();
      }

    }.bind(this);
    
    function maker(key){
      this[key] = {};
      this[key].open = false;
      this[key].toggle = function(){
        this[key].open = !this[key].open;

        if (this[key].open){
          menu.forEach(function(item){
            if (item !== key){
              this[item].open = false;
            }
          }.bind(this));
        }

      }.bind(this);
    }
    menu.forEach(function(menuItem){
      maker.bind(this)(menuItem);
    }.bind(this));


    this.bartab1 = {};
    this.bartab1.open = true;
    this.bartab1.toggle = function(){
      this.bartab1.open = true;
      this.bartab2.open = false;
    }.bind(this);

    this.bartab2 = {};
    this.bartab2.open = false;
    this.bartab2.toggle = function(){
      this.bartab2.open = true;
      this.bartab1.open = false;
    }.bind(this);



    this.category = {};
    this.category.data = [];
    
    this.category.reload = function(){
    	Auth.getCurrentUser()
	    	.then((user) => {

	    		return Category.http.list({
	    			_business: user._business
	    		});

	    	})
	    	.then((data) => {

	    		this.category.data = data;

	    	});
    }.bind(this);
    // this.category.reload();

    this.category.provide = function(){
    	if (this.category.data.length === 0){
    		this.category.reload();
    	}
    }.bind(this);

    this.category.refresh = function(data){
    	this.category.data = data;
    }.bind(this);

})

.name;
