define(['Global', 'Upgrade'], function(G, Upgrade){
	return Backbone.Collection.extend({
		model: Upgrade,
		comparator: 'order',
		localStorage: new Backbone.LocalStorage(G.storage.culture)
	});
});