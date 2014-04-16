define([
	'Global', 'Utils', 'Village', 'Objects', 'WorkersController', 'ResourcesController', 'VillagersController',
	'BuildingsController', 'UpgradesController', 'CultureController'
], function(
	G, Utils, Village, Objects, WorkersController, ResourcesController, VillagersController,
	BuildingsController, UpgradesController, CultureController
){
	return Backbone.View.extend({
		initialize: function(){
			this.model = Utils.storage.loadOrCreateBackboneModel(G.storage.village, Village, Objects.village);
			this.model.on('change', this.update, this);

			this.villagers	= new VillagersController(Objects.villagers);
			this.workers	= new WorkersController(Objects.jobs);
			this.resources	= new ResourcesController('#resources', Objects.resources);
			this.buildings	= new BuildingsController('#buildings', '#builderActions', Objects.buildings);
			this.upgrades	= new UpgradesController(Objects.upgrades);
			this.culture	= new CultureController(Objects.cultureTraits);
		},
		advanceSeason: function(){
			var season = this.model.get('season');
			if(season >= G.seasons.length){
				this.model.set('season', 0);
			} else {
				this.model.set('season', season+1);
			}
			},
		update: function(){
			Utils.storage.saveItem(G.storage.village, this.model);
		}

	});
});