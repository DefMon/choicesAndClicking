angular.module( 'ngAlone.aloneConfig', [])
.factory('gameConstants', function(){
    return {
        seasons: ['Winter', 'Spring', 'Summer', 'Autumn'],
        seasonAdvanceTick: 10
    };
});