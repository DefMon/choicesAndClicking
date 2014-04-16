describe('SeasonService', function (){
    var SeasonService,
        gameConstantsMock,
        storageMock;
    beforeEach(function(){
        module('ngAlone.gameState', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            gameConstantsMock = {
                seasons: ['Winter', 'Spring'],
                seasonAdvanceTick: 3
            };
            $provide.value('storage', storageMock);
            $provide.value('gameConstants', gameConstantsMock);
        });


        inject(function(_SeasonService_) {
            SeasonService = _SeasonService_;
            expect(storageMock.get).toHaveBeenCalledWith('seasonTick');
            expect(storageMock.get).toHaveBeenCalledWith('season');
        });
    });


    it('can incrementally advance towards a new season', function(){
        //default is 0
        SeasonService.tick();
        expect(storageMock.set).toHaveBeenCalledWith('seasonTick', 1);
        SeasonService.tick();
        expect(storageMock.set).toHaveBeenCalledWith('seasonTick', 2);
    });

    it('can return the current season id', function(){
        expect(SeasonService.getCurrentSeasonId()).toBe(0);
    });

    it('can return the current season\'s name', function(){
        expect(SeasonService.getCurrentSeasonName()).toBe('Winter');
    });

    it('can return the current season', function(){
        expect(SeasonService.getCurrentSeason()).toBe('Winter');

    });

    it('when season has been advanced towards enough, the ticker resets to 0 and season advances', function(){
        SeasonService.tick();
        SeasonService.tick();
        SeasonService.tick();
        expect(storageMock.set).toHaveBeenCalledWith('seasonTick', 0);
        expect(SeasonService.getCurrentSeasonId()).toBe(1);
        expect(storageMock.set).toHaveBeenCalledWith('season', 1);
    });

    it('when season has been advanced enough, it loops back around', function(){
        SeasonService.tick();
        SeasonService.tick();
        SeasonService.tick();
        SeasonService.tick();
        SeasonService.tick();
        SeasonService.tick();
        expect(storageMock.set).toHaveBeenCalledWith('season', 0);
    });

});