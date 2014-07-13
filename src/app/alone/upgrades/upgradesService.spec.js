/*globals describe, jasmine, it, beforeEach, expect, inject, _, module*/
describe('UpgradesService', function (){
    'use strict';
    var UpgradesService,
        ResourceServiceMock,
        storageMock,
        BuildingServiceMock,
        PopulationServiceMock,
        upgradeEffectsMock,
        upgradesMock;

    beforeEach(function (){

        // load the module.
        module('ngAlone.upgrades', function($provide){
            storageMock = jasmine.createSpyObj('storage', ['get', 'set']);
            ResourceServiceMock = jasmine.createSpyObj('ResourceService', ['loseResources']);
            upgradesMock = {
                woodenAxes: {
                    isBuilt: false,
                    isUnlocked: true,
                    variables: {},
                    onBuild: ['upgradeBuilding']
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
            upgradeEffectsMock = jasmine.createSpyObj('upgradeEffects', ['upgradeBuilding']);
            $provide.value('storage', storageMock);
            $provide.value('_', _);
            $provide.value('upgradeDefinitions', upgradesMock);
            $provide.value('upgradeEffects', upgradeEffectsMock);
            $provide.value('ResourceService', ResourceServiceMock);
            $provide.value('BuildingService', BuildingServiceMock);
            $provide.value('PopulationService', PopulationServiceMock);
        });

        inject(function(_UpgradesService_) {
            UpgradesService = _UpgradesService_;
            expect(storageMock.get).toHaveBeenCalledWith('villageUpgrades');
        });
    });

    describe('Upgrades', function(){
        it('can return a list of unbuilt and unlocked upgrades', function(){
            var availableUpgrades = UpgradesService.getAvailableUpgrades();
            expect(availableUpgrades.length).toBe(2);
            expect(_.every(availableUpgrades, function(upgrade){
                return upgrade.isUnlocked && !upgrade.isBuilt;
            }));
        });

        it('can return a list of built upgrades', function(){
            var availableUpgrades = UpgradesService.getBuiltUpgrades();
            expect(availableUpgrades.length).toBe(2);
            expect(_.every(availableUpgrades, function(upgrade){
                return upgrade.isBuilt;
            }));
        });

        it('can construct an upgrade if there is enough resources to pay for it', function(){
            ResourceServiceMock.loseResources.andReturn(true);
            UpgradesService.build(upgradesMock.woodenAxes);
            expect(upgradesMock.woodenAxes.isBuilt).toBeTruthy();
        });

        it('won\'t construct an upgrade if there is not enough resources to pay for it', function(){
            ResourceServiceMock.loseResources.andReturn(false);
            UpgradesService.build(upgradesMock.woodenAxes);
            expect(upgradesMock.woodenAxes.isBuilt).toBeFalsy();
        });

        it('runs the onBuild function of an upgrade when it is built', function(){
            ResourceServiceMock.loseResources.andReturn(true);
            UpgradesService.build(upgradesMock.woodenAxes);
            expect(upgradeEffectsMock.upgradeBuilding).toHaveBeenCalledWith(upgradesMock.woodenAxes.variables, PopulationServiceMock, BuildingServiceMock);
        });
    });

});

