import angular from 'angular';
import '@uirouter/angularjs';
import ngMaterial from 'angular-material';
import ngMessages from 'angular-messages';
import ngAnimate from 'angular-animate';
import ngAria from 'angular-aria';

import '../../node_modules/angular-material/angular-material.css';
//import '../style/app.css';
import app from './components/app/app.directive';
import AppCtrl from './components/app/app.controller';

import routing from './app.config';
import UserCardModule from './components/userCard/userCard.module';

const MODULE_NAME = 'app';

AppCtrl.$inject = ['$mdSidenav'];

const deps = ['ui.router', 'ngMaterial', 'ngMessages', 'ngAnimate', 'ngAria', 'HomeModule', 'AboutModule','UserCardModule']

angular.module(MODULE_NAME, deps)
  .component('app', {
    template: require('./app.tmpl.html'),
    controller: AppCtrl
  })
  .config(routing)
  
export default MODULE_NAME;