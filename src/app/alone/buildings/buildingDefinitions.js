angular.module( 'ngAlone.buildings')

.factory('buildingDefinitions', function(){
    return {
        dwelling: {
            title: 'Hut',
            cost: {wood: 1},
            count: 0,
            unlocked: true
        },
        farm: {
            title: 'Farm',
            cost: {food: 1, wood:1},
            count: 0,
            unlocked: false
        }
    };
})

;