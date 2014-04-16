angular.module( 'ngAlone.aloneConfig')

.factory('resourceDefinitions', function(){
    return {
        food: {title: 'Food', count: 0, unlocked: true},
        wood: {title: 'Wood', count: 0, unlocked: true},
        rope: {title: 'Rope', count: 0, unlocked: false}
    };
})

.factory('resourceActionDefinitions', function(){
    return {
        getFood: {title: 'Forage', cost: {}, income: {food: 1}, unlocked: true},
        getWood: {title: 'Chop wood', cost: {}, income: {wood: 1}, unlocked: true},
        getRope: {title: 'Weave rope', cost: {}, income: {rope: 1}, unlocked: false}
    };
})
;