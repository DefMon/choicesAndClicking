angular.module( 'ngAlone.population')

.factory('jobDefinitions', function(){
    return {
        getFood: {
            title: 'Forager',
            cost: {},
            income: {food: 1},
            count: 10,
            unlocked: false
        },
        getWood: {
            title: 'Lumberjack',
            cost: {},
            income: {wood: 1},
            count: 0,
            unlocked: false
        }
    };
})

;