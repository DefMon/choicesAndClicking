define(['Global', 'Utils', 'GameEventsCollection'],
function(G, Utils, GameEventsCollection){
	return Backbone.View.extend({
		initialize: function(defaultEvents){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(GameEventsCollection, defaultEvents);
			Utils.debug.log('Events initialized');
		}	
	});	
});