angular.module( 'ngAlone.population')

.factory('jobDefinitions', function(){
    return {
        getFood: {
            title: 'Forager',
            cost: {},
            income: {food: 1},
            count: 10,
            unlocked: true
        },
        getWood: {
            title: 'Lumberjack',
            cost: {},
            income: {food: 1},
            count: 0,
            unlocked: true
        }
    };
})

;