'use strict';

import angular from 'angular';
// import ngAnimate from 'angular-animate';
import ngCookies from 'angular-cookies';
import ngResource from 'angular-resource';
import ngSanitize from 'angular-sanitize';
import 'angular-socket-io';

import uiRouter from 'angular-ui-router';
import uiBootstrap from 'angular-ui-bootstrap';
// import ngMessages from 'angular-messages';
// import ngValidationMatch from 'angular-validation-match';

import uiSelect from 'ui-select';
import uiGrid from 'angular-ui-grid';

import {
  routeConfig
} from './app.config';

import _Auth from '../components/auth/auth.module';
import account from './account';
import admin from './admin';
import navbar from '../components/navbar/navbar.component';
import footer from '../components/footer/footer.component';
import main from './main/main.component';



import user from './admin/user/user.component';

import business from './boss/business/business.component';

import staff from './manager/staff/staff.component';
import category from './manager/category/category.component';
import product from './manager/product/product.component';


import transport from './service/transport.service';
import ui from './service/ui.service';



import constants from './app.constants';
import util from '../components/util/util.module';
import socket from '../components/socket/socket.service';

import translate from './app.translate';

import './app.scss';

angular.module('owApp', [ngCookies, ngResource, ngSanitize, 'btford.socket-io', uiRouter,
    
    'ui.select',

    'ui.grid',
    'ui.grid.edit',
    'ui.grid.rowEdit', 
    'ui.grid.cellNav',

    transport,
    ui,


    business,
    staff,
    user,
    category,
    product,

    translate,  

    uiBootstrap, _Auth, account, admin, navbar, footer, main, constants, socket, util
  ])
  .config(routeConfig)
  .run(function($rootScope, $location, Auth) {
    'ngInject';
    // Redirect to login if route requires auth and you're not logged in

    $rootScope.$on('$stateChangeStart', function(event, next) {
      Auth.isLoggedIn(function(loggedIn) {
        if(next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  });

angular.element(document)
  .ready(() => {
    angular.bootstrap(document, ['owApp'], {
      strictDi: true
    });
  });
