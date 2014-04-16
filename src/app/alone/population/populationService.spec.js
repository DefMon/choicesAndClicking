/**
 * Tests sit right alongside the file they are testing, which is more intuitive
 * and portable than separating `src` and `test` directories. Additionally, the
 * build process will exclude all `.spec.js` files from the build
 * automatically.
 */
describe('PopulationService', function (){
    var PopulationService,
        ResourceServiceMock,
        storageMock,
        jobsMock;
  
    beforeEach(function (){
    
    // load the module.
        module('ngAlone.population', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            ResourceServiceMock = jasmine.createSpyObj('ResourceServiece',
                ['gainResources', 'loseResources']);
            jobsMock = {
                getFood: {
                    name: 'getFood',
                    title: 'Forager',
                    cost: false,
                    income: {food: 1},
                    count: 0,
                    unlocked: true
                },
                getWood: {
                    name: 'getWood',
                    title: 'Lumberjack',
                    cost: {},
                    income: {wood: 1},
                    count: 0,
                    unlocked: true
                },
                getRope: {
                    name: 'getRope',
                    title: 'Rope Weaver',
                    cost: {food: 1},
                    income: {rope: 0.5},
                    count: 0,
                    unlocked: false
                }
            };
            $provide.value('storage', storageMock);
            $provide.value('_', _);
            $provide.value('jobDefinitions', jobsMock);
            $provide.value('ResourceService', ResourceServiceMock);
        });
    
        // inject your service for testing.
        // The _underscores_ are a convenience thing
        // so you can have your variable name be the
        // same as your injected service.
        inject(function(_PopulationService_) {
            PopulationService = _PopulationService_;
            expect(storageMock.get).toHaveBeenCalledWith('villageWorkers');
        });
    });

    describe('Population', function(){
        it('can return a collection of unlocked jobs', function(){
            var availableJobs = PopulationService.getAvailableJobs();
            expect(availableJobs.length).toBe(2);
            expect(_.every(availableJobs, function(job){
                return job.unlocked;
            }));
        });

        it('can gain a new worker', function(){
            PopulationService.gainVillager();
            expect(jobsMock.getFood.count).toBe(1);
        });

        it('can move workers from the main worker pool into other jobs', function(){
            PopulationService.gainVillager();
            PopulationService.assignWorker(jobsMock.getWood);
            expect(jobsMock.getFood.count).toBe(0);
            expect(jobsMock.getWood.count).toBe(1);
            expect(storageMock.set).toHaveBeenCalledWith('villageWorkers', jobsMock);
        });

        it('can move workers from jobs into the main worker pool', function(){
            PopulationService.gainVillager();
            PopulationService.assignWorker(jobsMock.getWood);
            PopulationService.unassignWorker(jobsMock.getWood);
            expect(jobsMock.getFood.count).toBe(1);
            expect(jobsMock.getWood.count).toBe(0);
            expect(storageMock.set).toHaveBeenCalledWith('villageWorkers', jobsMock);
        });

        it('can collect income and pay the associated cost from all assigned workers', function(){
            ResourceServiceMock.loseResources.andReturn(true);
            jobsMock.getFood.count = 1;
            jobsMock.getWood.count = 2;
            jobsMock.getRope.count = 1;
            PopulationService.collectIncome();
            expect(ResourceServiceMock.loseResources).toHaveBeenCalledWith({food:1});
            expect(ResourceServiceMock.gainResources).toHaveBeenCalledWith({food:1, wood: 2, rope: 0.5});
        });

        it('does not collect income from workers who cannot be paid for', function(){
            ResourceServiceMock.loseResources.andReturn(false);
            jobsMock.getFood.count = 1;
            jobsMock.getWood.count = 2;
            jobsMock.getRope.count = 1;
            PopulationService.collectIncome();
            expect(ResourceServiceMock.loseResources).toHaveBeenCalledWith({food:1});
            expect(ResourceServiceMock.gainResources).toHaveBeenCalledWith({food:1, wood: 2});
        });
    });

});

