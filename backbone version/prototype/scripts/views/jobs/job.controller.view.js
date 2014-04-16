define(['Global', 'JobsCollection', 'JobView', 'Utilities'], function(G, JobCollection, JobItemView, Utils){
	var JobsView = Backbone.View.extend({
		subscriptions: {
			'jobs:assign'		: 'assignWorker',
			'jobs:unassign'		: 'unassignWorker',
			'jobs:upgrade'		: 'upgradeJobs',
			'jobs:create'		: 'createJobs',
			'jobs:destroy'		: 'destroyJobs',
			'unlock:job'		: 'unlockNamedJob'
		},
		initialize: function(element, villagers){
			this.setElement(element);
			this.collection = new JobCollection(villagers);
			this.collection.fetch({remove: false});
			this.collection.on('add', this.renderItem, this);
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
				item.save();
				if(item.get('unlocked')){
					this.renderItem(item);
				}
			}, this);
		},
		renderItem: function(item){
			var itemView = new JobItemView({model: item});
			this.$el.find('ul').append(itemView.render().el);
		},
		gainNewWorkers: function(workersGained) {
			var defaultJob = this.collection.findWhere({name: G.variables.workerPoolName});
			workersGained = workersGained || 1;
			defaultJob.set('count', defaultJob.get('count')+workersGained);
		},
		assignWorker: function(jobId) {
			var workerPool = this.collection.findWhere({name: G.variables.workerPoolName}),
				newJob = this.collection.get(jobId);

			if(!newJob.get('max') || newJob.get('count') < newJob.get('max')) {
				if (workerPool.get('count') > 0) {
					workerPool.set('count', workerPool.get('count')-1);
					newJob.set('count', newJob.get('count')+1);
				} else {
					Backbone.Mediator.publish(G.events.feedWarning, 'Cannot assign new '+newJob.get('title')+' because you have no spare '+workerPool.get('title')+'s');
				}
			} else {
				Backbone.Mediator.publish(G.events.feedWarning, 'Cannot assign new '+newJob.get('title')+' because you have no space for them');
			}
		},
		unassignWorker: function(jobId){
			var workerPool = this.collection.findWhere({name: 'forager'}),
				oldJob = this.collection.get(jobId);
			if (oldJob.get('count') > 0) {
				oldJob.set('count', oldJob.get('count')-1);
				workerPool.set('count', workerPool.get('count')+1);
			} else {
				Backbone.Mediator.publish(G.events.feedWarning, 'Cannot unassign '+oldJob.get('title')+' because you have none');
			}
		},
		upgradeJobs: function(improvements){
			var jobs = this.collection;
			_.each(improvements, function(jobImprovements, jobName){
				var job = jobs.findWhere({name:jobName});
				_.each(jobImprovements, function(upgrade, propertyName){
					Utils.modifyProperty(job, propertyName, upgrade);
				});
			});
		},
		createJobs: function(jobName, quantity){
			var job = this.collection.findWhere({name: jobName}),
				newCount = quantity || 0;

			isNewJobType = !job.get('unlocked');
			job.set('max', job.get('max') + newCount);

			if(isNewJobType) {
				this.unlockJob(job);
			}

			return this;
		},
		destroyJobs: function(jobName, quantity) {
			this.createJobs(jobName, quantity *-1);
		},
		lockJob: function(jobId) {
			var job = this.collection.get(jobId);

			if(job.get('unlocked')){
				job.set('unlocked', false);
				job.save();
				this.renderItem(job);
			}
			return this;
		},
		unlockNamedJob: function(jobName){
			var job = this.collection.findWhere({name: jobName});
			this.unlockJob(job);
		},
		unlockJob: function(job) {
			if(!job.get('unlocked')){
				job.set('unlocked', true);
				job.save();
				this.renderItem(job);
			}
			return this;

		},
		// exhaustResource: function(resourceName) {
		// 	var affectedJobs = this.collection.filter(function(job){
		// 		return Boolean(job.income[resourceName]);
		// 	});
		// 	_.each(affectedJobs, function(job){
		// 		var lockedBy = job.get('lockedBy') || [];
		// 		if(!job.get('unlocked')) {
		// 			lockedBy.push('tech');
		// 		}
		// 		lockedBy.push(resourceName);
		// 		job.set('lockedBy', lockedBy);
		// 		this.lockJob(job.id);
		// 	}, this);
		// },
		// replenishResource: function(resourceName) {
		// 	var affectedJobs = this.collection.filter(function(job){
		// 		return Boolean(job.income[resourceName]);
		// 	});
		// 	_.each(affectedJobs, function(job){
		// 		if(job.get('lockedBy')) {
		// 			var lockedBy = _.without(job.lockedBy, resourceName);
		// 			if(lockedBy.length === 0){
		// 				job.unset('lockedBy', {silent: true});
		// 			} else {
						
		// 			}
					
		// 		}
		// 	}, this);
		// },
		gatherIncome: function(){
			function produce(job) {
				if(job.get('count')) {
					Backbone.Mediator.publish(G.events.collectJobIncome, job.get('cost'), job.get('income'), job.get('count'), job.get('title'));
				}
			}
			for(var currentPriority = 0; currentPriority < G.variables.jobPriorities; currentPriority++) {
				var currentJobs = this.collection.where({unlocked: true, priority: currentPriority});
				_.each(currentJobs, produce);
			}
		},
		starve: function(losses){
			function killWorkers (job) {
				if (losses > 0) {
					var workerCount = job.get('count');
					if(workerCount && workerCount <= losses) {
						losses = losses - workerCount;
						job.set('count', 0);
					} else {
						job.set('count', workerCount - losses);
						losses = 0;
					}
				}
			}

			for(var currentPriority = G.variables.jobPriorities; currentPriority--;) {
				if(losses > 0) {
					var currentJobs = this.collection.where({unlocked: true, priority: currentPriority});
					_.each(currentJobs, killWorkers);
				}
			}
		}
	});

	return JobsView;
});