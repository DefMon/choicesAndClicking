define(['Global', 'Upgrade'], function(G, Upgrade){
	return Backbone.Collection.extend({
		model: Upgrade,
		localStorage: new Backbone.LocalStorage(G.storage.upgrades)
	});
});