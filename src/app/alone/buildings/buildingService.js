angular.module( 'ngAlone.buildings')
.service('BuildingService', ['storage', '_', 'buildingDefinitions', 'ResourceService',
function(storage, _, buildingDefinitions, ResourceService){
    var buildings = storage.get('villageBuildings') || buildingDefinitions;
    var publicFunctions = {
        getAvailableBuildings: function(){
            return _.where(buildings, {unlocked: true});
        },
        build: function(building){
            if(ResourceService.loseResources(building.cost)) {
                building.count++;
            }
        }
    };

    return publicFunctions;
}]);