/*globals describe, jasmine, it, beforeEach, expect, inject, _, module*/
describe('Upgrade Controller', function(){
        var UpgradesController,
            UpgradesServiceMock,
            upgradesMock,
            woodenAxesOnBuildMock =  jasmine.createSpy('woodenAxesOnBuild'),
            $scope;
  
    beforeEach(function (){
        UpgradesServiceMock = jasmine.createSpyObj('UpgradesService',
            ['getAvailableUpgrades', 'getBuiltUpgrades', 'build']);
        upgradesMock = {
            woodenAxes: {
                isBuilt: false,
                isUnlocked: true,
                onBuild: woodenAxesOnBuildMock
            },
            woodenSpears: {
                isBuilt: true,
                isUnlocked: true
            },
            stoneAxes: {
                isBuilt: true,
                isUnlocked: true
            },
            stoneSpears: {
                isBuilt: false,
                isUnlocked: true
            },
            laserGuns: {
                isBuilt: false,
                isUnlocked: false
            }
        };
        module('ngAlone.upgrades');

        inject(function($rootScope, $controller) {
            $scope = $rootScope.$new();

            UpgradesServiceMock.getAvailableUpgrades.andReturn(upgradesMock);
            UpgradesServiceMock.getBuiltUpgrades.andReturn(upgradesMock);

            UpgradesController = $controller('UpgradesController', {
                $scope: $scope,
                UpgradesService: UpgradesServiceMock
            });
        });
    });

    it('sets built and available upgrades on the scope', function(){
        expect($scope.availableUpgrades).toBe(upgradesMock);
        expect($scope.builtUpgrades).toBe(upgradesMock);
    });

    it('can construct Upgrades', function(){
        $scope.build(upgradesMock.woodenAxes);
        expect(UpgradesServiceMock.build).toHaveBeenCalledWith(upgradesMock.woodenAxes);
    });
});