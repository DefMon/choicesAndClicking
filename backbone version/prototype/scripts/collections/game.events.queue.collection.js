define(['Global', 'GameEvent'], function(G, GameEvent){
	return Backbone.Collection.extend({
		model: GameEvent,
		comparator: 'order',
		localStorage: new Backbone.LocalStorage(G.storage.eventsQueue)
	});
});