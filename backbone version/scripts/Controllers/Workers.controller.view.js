define(['Global', 'Utils', 'JobsCollection'], function(G, Utils, JobsCollection){
	return Backbone.View.extend({
		initialize: function(defaultJobs){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(JobsCollection, defaultJobs);		
			this.workerPool = this.collection.findWhere({name: G.villagers.workerPool});
			Utils.debug.log('workers iniitalized');
		},
		assignWorker: function(job) {
			if(this.workerPool.get('count') > 0){
				this.workerPool.set('count', this.workerPool.get('count') - 1);
			} else {
				//Need to get a message out to Feed. SHould find a generla solution to how to send messages to Feed
			}
		},
		
	});
});