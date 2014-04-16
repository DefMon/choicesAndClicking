define(['Global', 'Resource'], function(G, Resource){
	return Backbone.Collection.extend({
		model: Resource,
		localStorage: new Backbone.LocalStorage(G.storage.resources)
	});
});