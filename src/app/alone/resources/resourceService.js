angular.module( 'ngAlone.resources')
.service('ResourceService', ['storage', '_', 'resourceDefinitions', 'resourceActionDefinitions',
function(storage, _, resourceDefinitions, resourceActionDefintions){
    var resources = storage.get('villageResources') || resourceDefinitions;
    var resourceActions = storage.get('resourceActions') || resourceActionDefintions;
    var actionObservers = [];
    var resourceObservers = [];

    function updateResourceAction(resourceAction, updates) {
        _.each(updates, function(value, key) {
            resourceAction[key] = value;
        });
        _.each(actionObservers, function(callback){
            callback();
        });
    }
    function updateResource(resource, updates) {
        _.each(updates, function(value, key) {
            resource[key] = value;
        });
        _.each(resourceObservers, function(callback){
            callback();
        });
    }

    var publicFunctions = {
        getAvailableResources: function(){
            return _.where(resources, {unlocked: true});
        },
        getResource: function(resourceName){
            return resources[resourceName];
        },
        getAvailableResourceActions: function(){
            return _.where(resourceActions, {unlocked: true});
        },
        getResourceAction: function(actionName){
            return resourceActions[actionName];
        },
        gainResource: function(resourceName, quantity) {
            var resource = resources[resourceName];
            quantity = quantity || 1;
            if (resource) {
                resource.count = resource.count + quantity;
            }
            storage.set('villageResources', resources);
            return true;
        },
        loseResource: function(resourceName, quantity) {
            quantity = quantity || 1;
            if(resources[resourceName].count >= quantity) {
                return this.gainResource(resourceName, quantity * -1);
            } else {
                return false;
            }
        },
        gainResources: function(resourcesGained){
            _.each(resourcesGained, function(amount, name){
                this.gainResource(name, amount);
            }, this);
            return true;
        },
        loseResources: function(resourcesLost){
            var allAvailable = _.every(resourcesLost, function(amount, name){
                return resources[name].count >= amount;
            });
            if(allAvailable) {
                _.each(resourcesLost, function(amount, name){
                    this.loseResource(name, amount);
                }, this);
            }
            return allAvailable;
        },
        unlockResource: function(resourceName){
            updateResource(resources[resourceName], {unlocked: true});
            storage.set('villageResources', resources);
        },
        unlockResourceAction: function(actionName){
            updateResourceAction(resourceActions[actionName], {unlocked: true});
            storage.set('resourceActions', resourceActions);
        },
        addResourceActionObserver: function(callback){
            actionObservers.push(callback);
        },
        addResourceObserver: function(callback){
            resourceObservers.push(callback);
        }
    };
    storage.set('villageResources', resources);


    return publicFunctions;
}]);