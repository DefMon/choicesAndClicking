define(['Global'], function(G){
	var idCount = 0;
	return [
		{id: idCount++, name: 'hut', cost: {wood: 15}, title:'Wooden hut', description: 'A pile of sticks that could technically be called a hut',
			buildSettings: {buildEvent: G.events.increasePopCap, unbuildEvent: G.events.decreasePopCap, quantity: 3},
			onbuild: function(options, unbuild){
				if(unbuild){
					Backbone.Mediator.publish(options.unbuildEvent. options.quantity);
				} else {
					Backbone.Mediator.publish(options.buildEvent, options.quantity);
				}
			}
		},
		{id: idCount++, name: 'farm', title:'Farm', cost: {wood: 20, food: 30}, description: 'A small plot of land you have decided to call a farm',
			buildSettings: {buildEvent: G.events.createJob, unbuildEvent: G.events.destoryJob, job: 'farmer', quantity: 2},
			onbuild: function(options, unbuild){
				if(unbuild) {
					Backbone.Mediator.publish(options.unbuildEvent, options.job, options.quantity);
				} else {
					Backbone.Mediator.publish(options.buildEvent, options.job, options.quantity);
				}
			}
		}
	];
});