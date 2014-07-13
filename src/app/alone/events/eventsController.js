angular.module('ngAlone.events')
.controller( 'EventsController', ['$scope', 'EventsService',
function($scope, EventsService) {
    'use strict';
    var immediateEvent = EventsService.getImmediateEvent();
    function updateCurrentEvent(e, currentEvent) {
        $scope.currentEvent = currentEvent;
    }
    $scope.$on('eventUpdate', updateCurrentEvent);
    if(immediateEvent) {
        EventsService.setCurrentEvent(immediateEvent);
    }

    $scope.makeChoice = function(choiceIndex){
        EventsService.resolveCurrentEvent(choiceIndex);
    };

}]);

