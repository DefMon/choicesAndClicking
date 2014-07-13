angular.module( 'ngAlone.aloneConfig', [])
.factory('gameConstants', function(){
    return {
        seasons: ['Winter', 'Spring', 'Summer', 'Autumn'],
        seasonAdvanceTick: 10,
        defaultPopulationVariables: {
            currentPop: 10,
            maxPop: 10
        },
        workerPoolName: 'getFood'
    };
});