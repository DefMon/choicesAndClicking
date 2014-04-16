describe('Resource Controller', function(){
      var ResourceController,
          ResourceServiceMock,
          resourcesMock,
          resourceActionsMock,
          $scope;
  
    beforeEach(function (){
        ResourceServiceMock = jasmine.createSpyObj('ResourceService', 
            ['getAvailableResources', 'getAvailableResourceActions', 'loseResources', 'gainResources']);
        resourcesMock = {
            food: {title: 'Food', count: 0, unlocked: true},
            wood: {title: 'Wood', count: 0, unlocked: true},
            rope: {title: 'Rope', count: 0, unlocked: true}
        };
        resourceActionsMock = {
            getFood: {title: 'Forage', cost: {}, income: {food: 1}, unlocked: true},
            getWood: {title: 'Chop wood', cost: {}, income: {wood: 1}, unlocked: true},
            getRope: {title: 'Weave rope', cost: {food: 1}, income: {rope: 1}, unlocked: true}
        };
        module('ngAlone.resources');

        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            ResourceServiceMock.getAvailableResources.andReturn(resourcesMock);
            ResourceServiceMock.getAvailableResourceActions.andReturn(resourceActionsMock);

            ResourceController = $controller('ResourceController', {
                $scope: $scope,
                ResourceService: ResourceServiceMock
            });
        });
    });

    it('sets resources and resourceActions on the scope', function(){
        expect($scope.resources).toBe(resourcesMock);
        expect($scope.resourceActions).toBe(resourceActionsMock);
    });

    it('pays cost and gains income when a resource action is taken', function(){
        var action = resourceActionsMock.getRope;
        ResourceServiceMock.loseResources.andReturn(true);
        $scope.takeAction(action);
        expect(ResourceServiceMock.loseResources).toHaveBeenCalledWith(action.cost);
        expect(ResourceServiceMock.gainResources).toHaveBeenCalledWith(action.income);
    });

    it('doesn\'t gain resources if it cannot pay the cost when an action is taken', function(){
        var action = resourceActionsMock.getRope;
        ResourceServiceMock.loseResources.andReturn(false);
        $scope.takeAction(action);
        expect(ResourceServiceMock.loseResources).toHaveBeenCalledWith(action.cost);
        expect(ResourceServiceMock.gainResources).not.toHaveBeenCalled();
    });
});