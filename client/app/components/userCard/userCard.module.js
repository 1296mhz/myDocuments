import angular from 'angular';

import UserCardComponent from './userCard.component';

export default angular.module('UserCardModule', [])
    .component('userCard', UserCardComponent)