import angular from 'angular';

let HomeComponent = {
    template: require('./home.tmpl.html'),
    controller: _homeController
};

function _homeController() {
   this.welcomeText = "Home page !"
    this.greeting = 'Webpack Angular Starter';
}

export default angular.module('HomeModule', [])
    .component('homeComponent', HomeComponent)