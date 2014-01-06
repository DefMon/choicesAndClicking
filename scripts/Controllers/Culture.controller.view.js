define(['Global', 'Utils', 'CultureTraitsCollection', 'CultureValues'], function(G, Utils, CultureTraitsCollection, CultureValues){
	return Backbone.View.extend({
		initialize: function(defaultCultureTraits, defaultCultureValues){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(CultureTraitsCollection, defaultCultureTraits);
			this.model = Utils.storage.loadOrCreateBackboneModel(G.storage.cultureValues, CultureValues, defaultCultureValues);
			Utils.debug.log('culture initialized');
		}
	});
});