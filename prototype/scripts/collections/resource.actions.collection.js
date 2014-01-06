define(['Global', 'ResourceAction'], function(G, ResourceAction){
	return Backbone.Collection.extend({
		model: ResourceAction,
		localStorage: new Backbone.LocalStorage(G.storage.resourceActions)
	});
});