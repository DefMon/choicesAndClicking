define(['Global', 'Action'], function(G, Action){
	return Backbone.Collection.extend({
		model: Action,
		localStorage: new Backbone.LocalStorage(G.storage.actions)
	});
});