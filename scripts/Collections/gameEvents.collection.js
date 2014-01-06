define(['Global', 'GameEvent'], function(G, GameEvent){
	return Backbone.Collection.extend({
		model: GameEvent,
		localStorage: new Backbone.LocalStorage(G.storage.gameEvents)
	});
});