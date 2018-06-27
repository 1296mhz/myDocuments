import HomeModule from './components/home/home.module';
import AboutModule from './components/about/about.module';
routing.$inject = ['$urlRouterProvider', '$locationProvider', '$stateProvider'];

export default function routing($urlRouterProvider, $locationProvider, $stateProvider) {
  $locationProvider.html5Mode(true);
  $urlRouterProvider.otherwise('/');

      let homeState = {
      name: 'home',
      url: '/',
      component: 'homeComponent'
    }
    let aboutState = {
      name: 'about',
      url: '/about',
      component: 'aboutComponent'
    }
    $stateProvider.state(homeState);
    $stateProvider.state(aboutState);
}