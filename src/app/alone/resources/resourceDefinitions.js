angular.module( 'ngAlone.resources')

.factory('resourceDefinitions', function(){
    return {
        food: {title: 'Food', count: 0, unlocked: false},
        wood: {title: 'Wood', count: 0, unlocked: false},
        rope: {title: 'Rope', count: 0, unlocked: false}
    };
})

.factory('resourceActionDefinitions', function(){
    return {
        getFood: {title: 'Forage', cost: {}, income: {food: 1}, unlocked: false},
        getWood: {title: 'Chop wood', cost: {}, income: {wood: 1}, unlocked: false},
        getRope: {title: 'Weave rope', cost: {}, income: {rope: 1}, unlocked: false}
    };
})
;