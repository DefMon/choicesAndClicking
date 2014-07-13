angular.module( 'ngAlone.upgrades')
    .service('UpgradesService', ['storage', '_', 'upgradeDefinitions', 'upgradeEffects', 'ResourceService', 'PopulationService', 'BuildingService',
        function(storage, _, upgradeDefinitions, upgradeEffects, ResourceService, PopulationService, BuildingService){
            'use strict';
            var upgrades = storage.get('villageUpgrades') || upgradeDefinitions;
            var publicFunctions = {
                getAvailableUpgrades: function(){
                    return _.where(upgrades, {isBuilt: false, isUnlocked: true});
                },
                getBuiltUpgrades: function(){
                    return _.where(upgrades, {isBuilt: true});
                },
                build: function(upgrade) {
                    if(ResourceService.loseResources(upgrade.cost)) {
                        upgrade.isBuilt = true;
                        if(upgrade.onBuild.length > 0) {
                            _.each(upgrade.onBuild, function(effectName){
                                upgradeEffects[effectName](upgrade.variables, PopulationService, BuildingService);
                            });
                        }
                        storage.set('villageUpgrades', upgrades);
                    }
                }
            };

            return publicFunctions;
        }]);