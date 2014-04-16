define(['Global', 'GameObjects', 'VillageView', 'FeedControllerView', 'GameEventControllerView', 'text!templates/game.base.template.html'],
function(G, Objects, VillageView, FeedView, EventsView, Template){
	return Backbone.View.extend({
		el: '#gameMain',
		template: _.template(Template),
		events: {
			'click #reset': 'reset'
		},
		initialize: function(){
			var gameController = this;
			function advanceSeason() {
				gameController.Village.season++;
				if(gameController.Village.season >= G.seasons.length) {
					gameController.Village.season = 0;
				}
			}
			var resourceInterval = setInterval(function(){
					Backbone.Mediator.publish(G.events.resourceInterval);
				}, G.variables.gainResourceInterval),
				// populationInterval = setInterval(function(){
				// 	Backbone.Mediator.publish(G.events.populationInterval);
				// }, G.variables.gainPopulationInterval),
				seasonInterval = setInterval(function(){
					advanceSeason();
				}, G.variables.seasonInterval);
			this.render();
		},
		render: function(){
			this.$el.html(this.template());

			this.Village = new VillageView(Objects.village);
			this.Events = new EventsView('#events', Objects.gameEvents, this.Village);
			this.Feed = new FeedView('#feed', Objects.feedEvents);
		},
		reset: function(){
			localStorage.clear();
			window.location.reload();
		}
	});
});