/*globals describe, beforeEach, it, jasmine, expect, inject*/
describe('PopulationService', function (){
    var PopulationService,
        ResourceServiceMock,
        storageMock,
        mathsUtilsMock,
        gameConstantsMock,
        jobsMock;
  
    beforeEach(function (){
    
    // load the module.
        module('ngAlone.population', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            ResourceServiceMock = jasmine.createSpyObj('ResourceService',
                ['gainResources', 'loseResources']);

            mathsUtilsMock = jasmine.createSpyObj('mathsUtils', ['applyOperation']);
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
            gameConstantsMock = {
                defaultPopulationVariables: {
                    maxPop: 10
                },
                workerPoolName: 'getFood'
            };
            $provide.value('storage', storageMock);
            $provide.value('_', _);
            $provide.value('jobDefinitions', jobsMock);
            $provide.value('ResourceService', ResourceServiceMock);
            $provide.value('gameConstants', gameConstantsMock);
            $provide.value('mathsUtils', mathsUtilsMock);
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

        it('can get and set the max Pop', function(){
            PopulationService.setMaxPop(7);
            expect(PopulationService.getMaxPop()).toBe(7);
            expect(storageMock.set).toHaveBeenCalledWith('populationVariables', PopulationService.getPopulationVariables());
        });

        it('can upgrade a named job', function(){
            mathsUtilsMock.applyOperation.andReturn(3);
            PopulationService.upgradeJobWithName('getFood', {income: {food: ['+',2]}});
            expect(mathsUtilsMock.applyOperation).toHaveBeenCalledWith(1, '+', 2);
            expect(jobsMock.getFood.income.food).toBe(3);
        });

        it('can apply multiple upgrades at once', function(){
            mathsUtilsMock.applyOperation.andReturn(3);
            PopulationService.upgradeJobWithName('getFood', {income: {food: ['+',2], wood: ['+',3]}, cost: {rope: ['-', 1]}});
            expect(mathsUtilsMock.applyOperation).toHaveBeenCalledWith(1, '+', 2);
            expect(mathsUtilsMock.applyOperation).toHaveBeenCalledWith(0, '+', 3);
            expect(mathsUtilsMock.applyOperation).toHaveBeenCalledWith(0, '-', 1 );
            expect(jobsMock.getFood.income.food).toBe(3);
            expect(jobsMock.getFood.income.wood).toBe(3);
            expect(jobsMock.getFood.cost.rope).toBe(3);

        });
    });

});

