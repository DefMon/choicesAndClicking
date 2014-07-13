angular.module( 'ngAlone.buildings')
.service('BuildingService', ['storage', '_', 'mathsUtils', 'buildingDefinitions', 'buildingEffects', 'ResourceService', 'PopulationService',
function(storage, _, Maths, buildingDefinitions, buildingEffects, ResourceService, PopulationService){
    'use strict';
    var buildings = storage.get('villageBuildings') || buildingDefinitions;
    var publicFunctions = {
        getAvailableBuildings: function(){
            return _.where(buildings, {unlocked: true});
        },
        upgradeBuildingWithName: function(buildingName, improvements){
            var building = buildings[buildingName];
            if(building) {
                _.each(improvements, function(improvement, propertyName){
                    var propertyValue = building.variables[propertyName] || 0;
                    building.variables[propertyName] = Maths.applyOperation(propertyValue, improvement[0], improvement[1]);
                });
            }
        },
        build: function(building){
            if(ResourceService.loseResources(building.cost)) {
                building.count++;
                if(building.onBuild.length > 0) {
                    _.each(building.onBuild, function(effectName){
                        buildingEffects[effectName](building.variables, PopulationService);
                    });
                }
                storage.set('villageBuildings', buildings);
            }
        }
    };

    return publicFunctions;
}]);