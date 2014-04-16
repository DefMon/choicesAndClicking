define(['Global', 'Building'], function(G, Building){
	return Backbone.Collection.extend({
		model: Building,
		localStorage: new Backbone.LocalStorage(G.storage.buildings)
	});
});