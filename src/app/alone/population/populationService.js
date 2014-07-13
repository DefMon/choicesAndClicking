angular.module( 'ngAlone.population')
.service('PopulationService', ['storage', '_', 'mathsUtils', 'gameConstants', 'jobDefinitions', 'ResourceService',
function(storage, _, Maths, gameConstants, jobDefinitions, ResourceService){
    'use strict';
    var jobs = storage.get('villageWorkers') || jobDefinitions;
    var populationVariables = storage.get('populationVariables') || gameConstants.defaultPopulationVariables;
    var workerPool = jobs[gameConstants.workerPoolName];
    var publicFunctions = {
        getPopulationVariables: function() {
            return populationVariables;
        },
        getMaxPop: function() {
            return populationVariables.maxPop;
        },
        setMaxPop: function(newPop) {
            populationVariables.maxPop = newPop;
            storage.set('populationVariables', populationVariables);
        },
        getAvailableJobs: function(){
            return _.where(jobs, {unlocked: true});
        },
        gainVillager: function(){
            workerPool.count++;
        },
        assignWorker: function(job) {
            if(workerPool.count > 0) {
                workerPool.count--;
                job.count++;
                storage.set('villageWorkers', jobs);
                return true;
            }
            return false;
        },
        unassignWorker: function(job) {
            if (job.count > 0) {
                job.count--;
                workerPool.count++;
                storage.set('villageWorkers', jobs);
                return true;
            }
            return false;
        },
        collectIncome: function() {
            var totalIncome = {};
            function increaseTotalIncome(quantity, resource){
                if(totalIncome[resource]) {
                    totalIncome[resource] += quantity;
                } else {
                    totalIncome[resource] = quantity;
                }
            }

            _.each(jobs, function(job){
                for(var i = job.count; i--;) {
                    if(job.cost && !_.isEmpty(job.cost)) {
                        if(!ResourceService.loseResources(job.cost)){
                            return false;
                        }
                    }
                    _.each(job.income, increaseTotalIncome);
                }
            });

            ResourceService.gainResources(totalIncome);
        },
        upgradeJobWithName: function(jobName, improvements){
            var job = jobs[jobName];
            function recursivelyApplyUpgrade(properties, parent) {
                _.each(properties, function(propertyValue, propertyName){
                    var existingValue;
                    if (_.isArray(propertyValue)) {
                        existingValue = parent[propertyName] || 0;
                        parent[propertyName] = Maths.applyOperation(existingValue, propertyValue[0], propertyValue[1]);
                    } else {
                        if(!parent[propertyName]){
                            parent[propertyName] = {};
                        }
                        recursivelyApplyUpgrade(propertyValue, parent[propertyName]);
                    }
                });
            }
            if(job) {
                recursivelyApplyUpgrade(improvements, job);
            }
        }
    };

    return publicFunctions;
}]);