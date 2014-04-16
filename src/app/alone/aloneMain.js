/**
 * Each section of the site has its own module. It probably also has
 * submodules, though this boilerplate is too simple to demonstrate it. Within
 * `src/app/home`, however, could exist several additional folders representing
 * additional modules that would then be listed as dependencies of this one.
 * For example, a `note` section could have the submodules `note.create`,
 * `note.delete`, `note.edit`, etc.
 *
 * Regardless, so long as dependencies are managed correctly, the build process
 * will automatically take take of the rest.
 *
 * The dependencies block here is also where component dependencies should be
 * specified, as shown below.
 */
angular.module( 'ngAlone', [
    'ui.state',
    'ngAlone.aloneConfig',
    'ngAlone.resources',
    'ngAlone.buildings',
    'ngAlone.population',
    'ngAlone.gameState'
])

/**
 * Each section or module of the site can also have its own routes. AngularJS
 * will handle ensuring they are all available at run-time, but splitting it
 * this way makes each module more "self-contained".
 */
.config(function config( $stateProvider ) {
    $stateProvider.state( 'alone', {
          url: '/alone',
          views: {
              "main": {
                  controller: 'AloneCtrl',
                  templateUrl: 'alone/alone.tpl.html'
              }
          },
          data:{ pageTitle: 'You are Alone' }
    });
})

/**
 * And of course we define a controller for our route.
 */
.controller( 'AloneCtrl',
function AloneController( $scope, storage, $interval, SeasonService, PopulationService ) {
    $scope.reset = function() {
      storage.clearAll();
      location.reload();
    };


    $interval(function(){
        PopulationService.collectIncome();
        SeasonService.tick();
    }, 10000);

})

;

