define(['Global', 'UpgradesCollection', 'UpgradeView', 'UpgradeActionView', 'Utilities'],
function(G, UpgradesCollection, UpgradeView, UpgradeActionView, Utils){
	return Backbone.View.extend({
		subscriptions: {
			'develop:building'	: 'advanceTechTreeFromBuilding',
			'develop:upgrade'	: 'advanceTechTreeFromUpgrade',
			'unlock:upgrade'	: 'unlockNamedUpgrade'
		},
		initialize: function(element, actionElement, upgrades){
			this.setElement(element);
			this.$actionEl = $(actionElement);
			this.collection = new UpgradesCollection(upgrades);
			this.collection.fetch({remove: false});
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
				item.save();
				if(item.get('unlocked')) {
					this.renderItem(item);
				}
			}, this);

			return this;
		},
		renderItem: function(item){
			var view;

			if(item.get('built')){
				view = new UpgradeView({model: item});
				this.$el.find('ul').append(view.render().el);
			} else {
				view = new UpgradeActionView({model: item});
				this.$actionEl.find('ul').append(view.render().el);
			}

			return this;
		},
		upgrade: function(upgradeId) {
			var upgrade = this.collection.get(upgradeId);
			upgrade.set('built', true);
			Backbone.Mediator.publish(G.events.developUpgrade, upgrade.get('name'));
			upgrade.get('onbuild')();
			upgrade.save();
			this.renderItem(upgrade);
		},
		unlockNamedUpgrade: function(upgradeName){
			var upgrade = this.collection.findWhere({name: upgradeName});
			this.unlock(upgrade);
		},
		unlock: function(upgrade) {
			if(!upgrade.get('unlocked')){
				upgrade.set('unlocked', true);
				upgrade.save();
				this.renderItem(upgrade);
			}
			return this;
		},
		advanceTechTreeFromBuilding: function(name, count) {
			var lockedUpgrades = this.collection.where({unlocked:false});
				_.each(lockedUpgrades, function(upgrade){
					if (upgrade.get('prereqs').buildings && upgrade.get('prereqs').buildings[name] && upgrade.get('prereqs').buildings[name] <= count) {
						delete upgrade.get('prereqs').buildings[name];
						if(Utils.shouldObjectBeUnlocked(upgrade, 'buildings')) {
							this.unlock(upgrade);
						}
					}
				}, this);
		},
		advanceTechTreeFromUpgrade: function(name) {
			var lockedUpgrades = this.collection.where({unlocked:false});
			_.each(lockedUpgrades, function(upgrade) {
				if(upgrade.get('prereqs').upgrades && _.contains(upgrade.get('prereqs').upgrades, name)) {
					upgrade.get('prereqs').upgrades = _.without(upgrade.get('prereqs').upgrades, name);
					if(Utils.shouldObjectBeUnlocked(upgrade, 'upgrades')) {
						this.unlock(upgrade);
					}
				}
			}, this);
		}
	});
});