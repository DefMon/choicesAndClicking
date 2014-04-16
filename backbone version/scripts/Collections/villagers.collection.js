define(['Global', 'Villager'], function(G, Villager){
	return Backbone.Collection.extend({
		model: Villager,
		localStorage: new Backbone.LocalStorage(G.storage.villagers)
	});
});