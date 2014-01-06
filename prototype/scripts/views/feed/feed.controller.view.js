define(['Global', 'FeedEventsCollection', 'FeedEventView'], function(G, FeedCollection, FeedView){
	return Backbone.View.extend({
		subscriptions: {
			'feed:warning' : 'displayWarning'
		},
		initialize: function(element){
			this.setElement(element);
			this.collection = new FeedCollection();
			this.collection.on('add', this.renderItem, this);
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
					this.renderItem(item);
			}, this);
		},
		renderItem: function(item){
			var itemView = new FeedView({model: item});
			this.$el.find('ul').prepend(itemView.render().el);
		},
		addEvent: function(eventText, type){
			this.collection.add({text: eventText, type: type});
		},
		displayWarning: function(eventText) {
			this.addEvent(eventText, 'warning');
		}
	});
});