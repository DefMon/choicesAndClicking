describe('Population Controller', function(){
        var PopulationController,
            PopulationServiceMock,
            jobsMock,
            populationVariablesMock,
            $scope;
  
    beforeEach(function (){
        PopulationServiceMock = jasmine.createSpyObj('PopulationService',
            ['getAvailableJobs', 'gainVillager', 'assignWorker', 'unassignWorker', 'getPopulationVariables']);
        jobsMock = {
            getFood: {
                title: 'Forager',
                cost: {},
                income: {food: 1},
                count: 0,
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
        populationVariablesMock = {
            maxPop: 10
        };
        module('ngAlone.population');

        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            PopulationServiceMock.getAvailableJobs.andReturn(jobsMock);
            PopulationServiceMock.getPopulationVariables.andReturn(populationVariablesMock);

            PopulationController = $controller('PopulationController', {
                $scope: $scope,
                PopulationService: PopulationServiceMock
            });
        });
    });

    it('sets variables on the scope', function(){
        expect($scope.jobs).toBe(jobsMock);
        expect($scope.populationVariables).toBe(populationVariablesMock);
    });

    it('can assign workers to a job', function(){
        $scope.assignWorker(jobsMock.getWood);
        expect(PopulationServiceMock.assignWorker).toHaveBeenCalledWith(jobsMock.getWood);
    });

    it('can unassign workers from a job', function(){
        $scope.unassignWorker(jobsMock.getWood);
        expect(PopulationServiceMock.unassignWorker).toHaveBeenCalledWith(jobsMock.getWood);
    });

});