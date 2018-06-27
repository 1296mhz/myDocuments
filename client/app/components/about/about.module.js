import angular from 'angular';

let AboutComponent = {
    template: require('./about.tmpl.html'),
    controller: _aboutController
};

function _aboutController() {
   this.welcomeText = "About page !"
    this.greeting = 'Webpack Angular Starter';
}

export default angular.module('AboutModule', [])
    .component('aboutComponent', AboutComponent)

