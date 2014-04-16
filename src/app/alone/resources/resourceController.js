angular.module( 'ngAlone.resources')
.controller( 'ResourceController', ['$scope', 'ResourceService',
function($scope, ResourceService) {
    $scope.takeAction = function(action) {
        if(ResourceService.loseResources(action.cost)){
            ResourceService.gainResources(action.income);
        }
    };
    $scope.resources = ResourceService.getAvailableResources();
    $scope.resourceActions = ResourceService.getAvailableResourceActions();

}]);

