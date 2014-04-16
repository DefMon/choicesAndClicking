angular.module('ngAlone.buildings')
.controller( 'BuildingController', ['$scope', 'BuildingService',
function($scope, BuildingService) {
    $scope.build = function(building) {
        BuildingService.build(building);
    };
    $scope.buildings = BuildingService.getAvailableBuildings();

}]);

