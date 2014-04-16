define(['Global', 'FeedEvent'], function(G, FeedEvent){
	return Backbone.Collection.extend({
		model: FeedEvent,
		localStorage: new Backbone.LocalStorage(G.storage.feedEvents)
	});
});