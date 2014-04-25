angular.module( 'ngBoilerplate', [
  'templates-app',
  'templates-common',
  'angularLocalStorage',
  'ngAlone',
  'ui.state',
  'underscore',
  'ui.route'
])

.config( function myAppConfig ( $stateProvider, $urlRouterProvider ) {
  $urlRouterProvider.otherwise( '/alone' );
})

.run( function run () {
})

.controller( 'AppCtrl', function AppCtrl ( $scope, $location ) {
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams){
    if ( angular.isDefined( toState.data.pageTitle ) ) {
      $scope.pageTitle = toState.data.pageTitle + ' | ng-alone' ;
    }
  });
})

;

