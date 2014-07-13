angular.module( 'ngAlone.buildings')

    .factory('buildingDefinitions', function(){

        return {
            dwelling: {
                title: 'Hut',
                cost: {wood: 1},
                count: 0,
                unlocked: false,
                variables: {size: 1},
                onBuild: ['increaseMaxPop']
            },
            farm: {
                title: 'Farm',
                cost: {food: 1, wood:1},
                count: 0,
                unlocked: false
            }
        };
    })
    .factory('buildingEffects', function(){
       'use strict';
        return {
           increaseMaxPop: function(variables, population) {
               population.setMaxPop(population.getMaxPop() + variables.size);
           }
       };
    })
;