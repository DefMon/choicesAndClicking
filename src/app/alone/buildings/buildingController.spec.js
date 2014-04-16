describe('Building Controller', function(){
        var BuildingController,
            BuildingServiceMock,
            buildingsMock,
            $scope;
  
    beforeEach(function (){
        BuildingServiceMock = jasmine.createSpyObj('BuildingService',
            ['getAvailableBuildings', 'build']);
            buildingsMock = {
                dwelling: {
                    title: 'Hut',
                    cost: {wood: 1},
                    count: 0,
                    unlocked: true
                },
                foodProducer: {
                    title: 'Farm',
                    cost: {wood: 1},
                    count: 0,
                    unlocked: true
                },
                temple: {
                    title: 'Temple',
                    cost: {wood: 1},
                    count: 0,
                    unlocked: true
                }
            };
        module('ngAlone.buildings');

        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            BuildingServiceMock.getAvailableBuildings.andReturn(buildingsMock);

            BuildingController = $controller('BuildingController', {
                $scope: $scope,
                BuildingService: BuildingServiceMock
            });
        });
    });

    it('sets buildings on the scope', function(){
        expect($scope.buildings).toBe(buildingsMock);
    });

    it('can construct buildings', function(){
        $scope.build(buildingsMock.dwelling);
        expect(BuildingServiceMock.build).toHaveBeenCalledWith(buildingsMock.dwelling);
    });
});