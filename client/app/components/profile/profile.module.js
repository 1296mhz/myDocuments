import angular from 'angular';

let ProfileComponent = {
    template: require('./profile.tmpl.html'),
    controller: _profileController
};

function _profileController() {
   this.welcomeText = "Profile page !"
    this.greeting = 'Webpack Angular Starter';
}

export default angular.module('ProfileModule', [])
    .component('profileComponent', ProfileComponent)