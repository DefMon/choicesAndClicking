angular.module('ngAlone.upgrades')
.controller( 'UpgradesController', ['$scope', 'UpgradesService',
function($scope, UpgradesService) {
    'use strict';
    function refreshLists() {
        $scope.builtUpgrades = UpgradesService.getBuiltUpgrades();
        $scope.availableUpgrades = UpgradesService.getAvailableUpgrades();
    }
    $scope.build = function(upgrade) {
        UpgradesService.build(upgrade);
        refreshLists();
    };
    refreshLists();

}]);

