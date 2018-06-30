import angular from 'angular';

let userCardComponent = {
      template: require('./userCard.component.html'),
      controller: _userCardController
}
    
function _userCardController() {
    this.userProfile = {
        username: "Sweet Cat",
        role: "Administrator",
        email: "myauu@cats.org"
     }

     this.theme = this.theme || 'default';
}

export default angular.module('UserCardModule', [])
    .component('userCard', userCardComponent)