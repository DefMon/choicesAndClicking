angular.module('ngAlone.population')
.controller( 'PopulationController', ['$scope', 'PopulationService',
function($scope, PopulationService) {
    $scope.assignWorker = function(job) {
        PopulationService.assignWorker(job);
    };
    $scope.unassignWorker = function(job) {
        PopulationService.unassignWorker(job);
    };
    $scope.jobs = PopulationService.getAvailableJobs();

}]);

