angular.module( 'ngAlone.upgrades')
    .factory('upgradeDefinitions', function(){
        'use strict';
        return {
            biggerHuts: {
                title: 'Bigger Huts',
                isBuilt: false,
                cost: {wood:1},
                isUnlocked: false,
                variables: {
                    building: {
                        name: 'dwelling',
                        effect: {size: ['+',1]}
                    }
                },
                onBuild: ['upgradeBuilding']
            },
            woodenAxes: {
                title: 'Wooden Axes',
                isBuilt: false,
                isUnlocked: false
            }
        };
    })
    .factory('upgradeEffects', function(){
        'use strict';
        return {
            upgradeBuilding: function(variables, population, buildings) {
                buildings.upgradeBuildingWithName(variables.building.name, variables.building.effect);
            },
            upgradeJob: function(variables, population) {
                population.upgradeJobWithName(variables.job.name, variables.job.effect);
            }
        };
    })
;