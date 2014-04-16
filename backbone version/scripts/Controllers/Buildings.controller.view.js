define([
	'Global', 'Utils', 'BuildingsCollection', 'BuildingView', 'BuilderActionView'
], function(G, Utils, BuildingsCollection, BuildingView, BuilderActionView){
	return Backbone.View.extend({
		initialize: function(element, actionsElement, defaultBuildings){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(BuildingsCollection, defaultBuildings);
			this.setElement(element);
			this.$actionsEl = $(actionsElement);
			this.render();
			Utils.debug.log('Actions initialized');
		},
		render: function(){
			_.each(this.collection.where({unlocked: true}), function(building){
				this.renderBuilding(building);
				if(building.get('buildable')) {
					this.renderBuildAction(building);
				}
			}, this);
			return this;
		},
		renderBuilding: function(building){
			var buildingView = new BuildingView({model: building});
			this.$el.append(buildingView.render().el);
			return this;
		},
		renderBuildAction: function(building) {
			var actionView = new BuilderActionView({model: building});
			this.$actionsEl.append(actionView.render().el);
			return this;
		},
		build: function(building) {
			var buildingCost = building.get('cost'),
				buildingCostCurve = building.get('costCurve');

			
			//This works but is a bit obtuse since it doesn't use .set(), 
			//Could use it but that will trigger a second update unnecessarily
			_.each(buildingCost, function(cost, resource){
				buildingCost[resource] = Math.round(cost * buildingCostCurve);
			}, this);

			if(building.get('onbuild')) {
				building.get('onbuild')(building);
			}

			building.set('count', building.get('count') + 1);
		}
	});
});