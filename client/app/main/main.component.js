import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

export class MainController {
  

  constructor(UI) {
    'ngInject';

    this.UI = UI;
    // this.Trans = Trans;

  }


  // awesomeThings = [];
  // newThing = '';

  // /*@ngInject*/
  // constructor($http, $scope, socket) {
  //   this.$http = $http;
  //   this.socket = socket;

  //   $scope.$on('$destroy', function() {
  //     socket.unsyncUpdates('thing');
  //   });
  // }

  // $onInit() {
  //   this.$http.get('/api/things')
  //     .then(response => {
  //       this.awesomeThings = response.data;
  //       this.socket.syncUpdates('thing', this.awesomeThings);
  //     });
  // }

  // addThing() {
  //   if(this.newThing) {
  //     this.$http.post('/api/things', {
  //       name: this.newThing
  //     });
  //     this.newThing = '';
  //   }
  // }

  // deleteThing(thing) {
  //   this.$http.delete(`/api/things/${thing._id}`);
  // }
}

export default angular.module('owApp.main', [uiRouter])
  .service('UI', function(){
      
    var menu = ['flag', 'bell', 'mail', 'profile', 'rightbar'];

    this.sidebar = {};
    this.sidebar.open = false;
    this.sidebar.toggle = function(){
      this.sidebar.open = !this.sidebar.open;

      menu.forEach(function(item){
        this[item].open = false;
      }.bind(this));
  

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




  })
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
