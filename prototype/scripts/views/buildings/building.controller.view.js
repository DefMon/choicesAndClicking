define(['Global', 'BuildingsCollection', 'BuildingView', 'BuildingActionView', 'Utilities'],
function(G, BuildingsCollection, BuildingView, BuildingActionView, Utils){
	var BuildingsView = Backbone.View.extend({
		subscriptions: {
			'destroy:building'	: 'destroyBuilding',
			'develop:building'	: 'advanceTechTreeFromBuilding',
			'unlock:building'	: 'unlockNamedBuilding',
			'develop:upgrade'	: 'advanceTechTreeFromUpgrade'
		},
		initialize: function(element, actionsElement, buildings){
			this.setElement(element);
			this.collection = new BuildingsCollection(buildings);
			this.collection.fetch({remove: false});
			this.$actionsEl = $(actionsElement);
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
				item.save();
				if(item.get('unlocked')){
					this.renderItem(item);
				}
			}, this);

			return this;

		},
		renderItem: function(item){
			var itemView = new BuildingView({model: item}),
				actionView = new BuildingActionView({model: item});
			this.$el.find('ul').append(itemView.render().el);
			this.$actionsEl.find('ul').append(actionView.render().el);

			return this;
		},
		increaseBuildingCost: function(buildingId) {
			var building = this.collection.get(buildingId),
				curveValue = building.get('costCurve'),
				newCost = building.get('cost');
			_.each(building.get('cost'), function(oldValue, name){
				newCost[name] = Math.round(oldValue * curveValue);
			});
			building.set('cost', newCost);
		},
		decreaseBuildingCost: function(buildingId) {
			var building = this.collection.get(buildingId),
				curveValue = building.get('costCurve'),
				newCost = building.get('cost');
			_.each(building.get('cost'), function(oldValue, name){
				newCost[name] = Math.round(oldValue / curveValue);
			});
			building.set('cost', newCost);
		},
		build: function(buildingId) {
			var building = this.collection.get(buildingId),
				buildingCount = building.get('count') + 1;
			this.increaseBuildingCost(buildingId);
			building.set('count', buildingCount);
			
			if(buildingCount === building.get('max')) {
				building.set('disabled', true);
			}
			Backbone.Mediator.publish(G.events.developBuilding, building.get('name'), building.get('count'));
			building.get('onbuild')(building.get('buildSettings'));

			return this;
		},
		destroyBuilding: function(buildingName) {
			var building = this.collection.findWhere({name: buildingName});
			this.destroy(building.id);
		},
		destroy: function(buildingId) {
			var building = this.collection.get(buildingId);
			buildingCount = building.get('count');
			if(buildingCount > 0) {
				building.set('count', buildingCount -1);
				building.set('disabled', false);
				this.decreaseBuildingCost(buildingId);
				building.get('onbuild')(building.get('buildSettings'), true);
			}
		},
		unlockNamedBuilding: function(buildingName){
			this.unlock(this.collection.findWhere({name:buildingName}));
		},
		unlock: function(building) {
			if(!building.get('unlocked')){
				building.set('unlocked', true);
				building.save();
				this.renderItem(building);
			}
			return this;
		},
		advanceTechTreeFromBuilding: function(name, count) {
			var lockedBuildings = this.collection.where({unlocked:false});
				_.each(lockedBuildings, function(building){
					if (building.get('prereqs').buildings && building.get('prereqs').buildings[name] && building.get('prereqs').buildings[name] <= count) {
						delete building.get('prereqs').buildings[name];
						if(Utils.shouldObjectBeUnlocked(building, 'buildings')) {
							this.unlock(building);
						}
					}
				}, this);
		},
		advanceTechTreeFromUpgrade: function(name) {
			var lockedBuildings = this.collection.where({unlocked:false});
			_.each(lockedBuildings, function(building) {
				if(building.get('prereqs').upgrades && _.contains(building.get('prereqs').upgrades, name)) {
					building.get('prereqs').upgrades = _.without(building.get('prereqs').upgrades, name);
					if(Utils.shouldObjectBeUnlocked(building, 'upgrades')) {
						this.unlock(building);
					}
				}
			}, this);
		}

	});

	return BuildingsView;
});