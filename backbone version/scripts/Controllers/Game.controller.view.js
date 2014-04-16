define([
	'Global', 'Utils', 'Objects', 'VillageController', 'FeedController', 
	'GameEventsController', 'ActionsController', 'text!templates/game.base.template.html'
], function(G, Utils, Objects, VillageController, FeedController, GameEventsController, ActionsController, Template){
	var subscriptions = {};
	subscriptions[G.events.takeAction] = 'takeAction';
	subscriptions[G.events.constructBuilding] = 'constructBuilding';
	return Backbone.View.extend({
		subscriptions: subscriptions,
		el: '#gameMain',
		template: _.template(Template),
		events: {
			'click #reset' : 'reset'
		},
		initialize: function() {
			this.render();
			this.startSeasonCycle();
			this.startEventCycle();
			this.startResourceCycle();
		},
		render: function(){
			this.$el.html(this.template());
			this.actions = new ActionsController('#actions', Objects.actions);
			this.village = new VillageController();
			this.feed = new FeedController('#feed');
			this.gameEvents = new GameEventsController('#events', Objects.events);
		},
		startEventCycle: function(){
			var gameController = this;
			this.eventTimeout = setTimeout(function(){
				Utils.debug.log('Event triggered');
				gameController.startEventCycle();
			}, Utils.maths.randBetween(G.timers.eventTimeoutMin, G.timers.eventTimeoutMax));
		},
		startResourceCycle: function(){
			this.resourceInterval = setInterval(function(){
				Utils.debug.log('Resources gathered');
			}, G.timers.resourceInterval);

		},
		startSeasonCycle: function(){
			var seasonTick = Number(Utils.storage.loadItem(G.storage.seasonTick)) || 0,
				gameController = this;
			this.seasonInterval = setInterval(function(){
				seasonTick++;
				if(seasonTick >= G.timers.seasonTicks) {
					seasonTick = 0;
					gameController.village.advanceSeason();
				}
				Utils.storage.saveItem(G.storage.seasonTick, seasonTick);
			}, G.timers.seasonInterval);
		},
		reset: function() {
			Utils.storage.clear();
			window.location.reload();
		},
		takeAction: function(action){
			if(!action.get('cost') || this.village.resources.payCost(action.get('cost'))) {
				if(action.get('income')) {
					this.village.resources.gatherIncome(action.get('income'));
				}
				if(action.get('effect')) {
					action.get('effect')();
				}
			}
		},
		constructBuilding: function(building){
			if(!building.get('cost') || this.village.resources.payCost(building.get('cost'))) {
				this.village.buildings.build(building);
			} else {
				this.feed.displayMessage('Not enough resources to build '+building.get('name'));
			}
		}
	});
});