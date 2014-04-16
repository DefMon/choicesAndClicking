angular.module( 'ngAlone.population')
.service('PopulationService', ['storage', '_', 'jobDefinitions', 'ResourceService',
function(storage, _, jobDefinitions, ResourceService){
    var jobs = storage.get('villageWorkers') || jobDefinitions;
    //TODO - Move this definition into game constants
    var workerPool = jobs.getFood;
    var publicFunctions = {
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
        }
    };

    return publicFunctions;
}]);