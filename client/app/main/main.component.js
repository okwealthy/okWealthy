import angular from 'angular';
import uiRouter from 'angular-ui-router';
import routing from './main.routes';

import NProgress from 'nprogress';


export class MainController {
  

  constructor(UI) {
    'ngInject';

    // NProgress.start();
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
  
  
  .config(routing)
  .component('main', {
    template: require('./main.html'),
    controller: MainController
  })
  .name;
