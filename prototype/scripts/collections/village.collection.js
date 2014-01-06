define(['Global', 'Village'], function(G, Village){
	return Backbone.Collection.extend({
		model: Village,
		localStorage: new Backbone.LocalStorage(G.storage.village)
	});
});