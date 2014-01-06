define(['Global', 'Utils', 'UpgradesCollection'], function(G, Utils, UpgradesCollection){
	return Backbone.View.extend({
		initialize: function(defaultUpgrades){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(UpgradesCollection, defaultUpgrades);		
			Utils.debug.log('upgrades iniitalized');
		}
	});
});