describe('Population Controller', function(){
        var PopulationController,
            PopulationServiceMock,
            jobsMock,
            $scope;
  
    beforeEach(function (){
        PopulationServiceMock = jasmine.createSpyObj('PopulationService',
            ['getAvailableJobs', 'gainVillager', 'assignWorker', 'unassignWorker']);
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
        module('ngAlone.population');

        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            PopulationServiceMock.getAvailableJobs.andReturn(jobsMock);

            PopulationController = $controller('PopulationController', {
                $scope: $scope,
                PopulationService: PopulationServiceMock
            });
        });
    });

    it('sets jobs on the scope', function(){
        expect($scope.jobs).toBe(jobsMock);
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