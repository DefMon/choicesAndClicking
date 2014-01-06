define(['Global', 'CultureTrait'], function(G, CultureTrait){
	return Backbone.Collection.extend({
		model: CultureTrait,
		localStorage: new Backbone.LocalStorage(G.storage.cultureTraits)
	});
});