angular.module( 'ngAlone.resources')
.controller( 'ResourceController', ['$scope', 'ResourceService',
function($scope, ResourceService) {
    'use strict';
    function updateResourceActions() {
        $scope.resourceActions = ResourceService.getAvailableResourceActions();
    }
    function updateResources() {
        $scope.resources = ResourceService.getAvailableResources();
    }
    $scope.takeAction = function(action) {
        if(ResourceService.loseResources(action.cost)){
            ResourceService.gainResources(action.income);
        }
    };
    updateResources();
    updateResourceActions();
    ResourceService.addResourceActionObserver(updateResourceActions);
    ResourceService.addResourceObserver(updateResources);

}]);

