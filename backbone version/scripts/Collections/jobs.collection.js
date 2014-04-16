define(['Global', 'Job'], function(G, Job){
	return Backbone.Collection.extend({
		model: Job,
		localStorage: new Backbone.LocalStorage(G.storage.jobs)
	});
});