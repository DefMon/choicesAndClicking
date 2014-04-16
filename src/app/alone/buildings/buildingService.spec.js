/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('BuildingService', function (){
    var BuildingService,
        ResourceServiceMock,
        storageMock,
        buildingsMock;
  
    beforeEach(function (){
    
    // load the module.
        module('ngAlone.buildings', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            ResourceServiceMock = jasmine.createSpyObj('ResourceService', ['loseResources']);
            buildingsMock = {
                dwelling: {
                    title: 'Hut',
                    count: 0,
                    unlocked: true
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
            $provide.value('storage', storageMock);
            $provide.value('_', _);
            $provide.value('buildingDefinitions', buildingsMock);
            $provide.value('ResourceService', ResourceServiceMock);
        });
    
        // inject your service for testing.
        // The _underscores_ are a convenience thing
        // so you can have your variable name be the
        // same as your injected service.
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
    });

});

