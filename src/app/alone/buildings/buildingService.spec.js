/*globals describe, jasmine, it, beforeEach, expect, inject, _, module*/
describe('BuildingService', function (){
    var BuildingService,
        ResourceServiceMock,
        storageMock,
        mathsUtilsMock,
        PopulationServiceMock,
        buildingEffectsMock,
        buildingsMock;
  
    beforeEach(function (){
    
    // load the module.
        module('ngAlone.buildings', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            mathsUtilsMock = jasmine.createSpyObj('mathsUtils', ['applyOperation']);
            ResourceServiceMock = jasmine.createSpyObj('ResourceService', ['loseResources']);
            PopulationServiceMock = jasmine.createSpyObj('PopulationService', ['increasePopCap']);
            buildingsMock = {
                dwelling: {
                    title: 'Hut',
                    count: 0,
                    unlocked: true,
                    variables: {
                        size: 1
                    },
                    onBuild: ['increasePopCap']
                },
                foodProducer: {
                    title: 'Farm',
                    count: 0,
                    unlocked: true
                },
                temple: {
                    title: 'Temple',
                    count: 0,
                    unlocked: false
                }
            };
            buildingEffectsMock = jasmine.createSpyObj('buildingEffects', ['increasePopCap']);
            $provide.value('storage', storageMock);
            $provide.value('_', _);
            $provide.value('buildingDefinitions', buildingsMock);
            $provide.value('buildingEffects', buildingEffectsMock);
            $provide.value('ResourceService', ResourceServiceMock);
            $provide.value('PopulationService', PopulationServiceMock);
            $provide.value('mathsUtils', mathsUtilsMock);
        });

        inject(function(_BuildingService_) {
            BuildingService = _BuildingService_;
            expect(storageMock.get).toHaveBeenCalledWith('villageBuildings');
        });
    });

    describe('Buildings', function(){
        it('can return a collection of unlocked buildings', function(){
            var availableBuildings = BuildingService.getAvailableBuildings();
            expect(availableBuildings.length).toBe(2);
            expect(_.every(availableBuildings, function(building){
                return building.unlocked;
            }));
        });

        it('can build new buildings', function(){
            ResourceServiceMock.loseResources.andReturn(true);
            BuildingService.build(buildingsMock.dwelling);
            expect(buildingsMock.dwelling.count).toBe(1);
        });

        it('won\'t build a new building if its build cost cannot be paid', function(){
            ResourceServiceMock.loseResources.andReturn(false);
            BuildingService.build(buildingsMock.dwelling);
            expect(buildingsMock.dwelling.count).toBe(0);
        });

        it('runs the onBuild function of a building when it is built', function(){
            ResourceServiceMock.loseResources.andReturn(true);
            BuildingService.build(buildingsMock.dwelling);
            expect(buildingEffectsMock.increasePopCap).toHaveBeenCalledWith(buildingsMock.dwelling.variables, PopulationServiceMock);
        });

        it('can upgrade a building given its name', function(){
            mathsUtilsMock.applyOperation.andReturn(3);
            BuildingService.upgradeBuildingWithName('dwelling', {size: ['+',2]});
            expect(mathsUtilsMock.applyOperation).toHaveBeenCalledWith(1, '+', 2);
            expect(buildingsMock.dwelling.variables.size).toBe(3);
        });
    });

});

