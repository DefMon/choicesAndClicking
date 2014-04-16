define(['Global', 'FeedEventsCollection', 'FeedEventView'],
function(G, FeedEventsCollection, FeedEventView){
	return Backbone.View.extend({
		initialize: function(element){
			this.setElement(element);
			this.collection = new FeedEventsCollection();
			this.collection.on('add', this.renderItem, this);
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
					this.renderItem(item);
			}, this);
		},
		renderItem: function(item){
			var itemView = new FeedEventView({model: item});
			this.$el.find('ul').prepend(itemView.render().el);
		},
		addEvent: function(eventText, type){
			this.collection.add({text: eventText, type: type});
		},
		displayMessage: function(text){
			this.addEvent(text, 'message');
		}
	});
});