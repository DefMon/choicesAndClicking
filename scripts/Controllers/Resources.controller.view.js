define([
	'Global', 'Utils', 'ResourcesCollection', 'ResourceView'
], function(G, Utils, ResourcesCollection, ResourceView){
	return Backbone.View.extend({
		initialize: function(element, defaultResources){
			this.setElement(element);
			this.collection = Utils.storage.loadOrCreateBackboneCollection(ResourcesCollection, defaultResources);
			this.render();
		},
		render: function(){
			this.collection.each(function(resource){
				this.renderResource(resource);
			}, this);
			return this;
		},
		renderResource: function(resource){
			var resourceView = new ResourceView({model: resource});
			this.$el.append(resourceView.render().el);
			return this;
		},
		payCost: function(cost){
			function checkStores(resourceController){
				var success = true;
				_.each(cost, function(quantityRequired, resourceName){
					var resourceInStore = this.collection.findWhere({name: resourceName});
					if(!resourceInStore) {
						Utils.debug.log(resourceName + ' is an invalid resource');
						success = false;
						return;
					}
					if(!resourceInStore.get('unlocked')) {
						Utils.debug.log(resourceName + ' is not yet unlocked');
						success = false;
						return;
					}
					if(quantityRequired >= resourceInStore.get('count')){
						success = false;
						return;
					}
				}, resourceController);
				return success;
			}

			if(checkStores(this)){
				_.each(cost, function(quantity, resourceName) {
					this.loseNamedResource(resourceName, quantity);
				}, this);
			} else {
				return false;
			}
			return true;
		},
		loseNamedResource: function(resourceName, amount){
			this.loseResource(this.collection.findWhere({name: resourceName}), amount);
		},
		gainNamedResource: function(resourceName, amount){
			this.gainResource(this.collection.findWhere({name: resourceName}), amount);
		},
		gainResource: function(resource, amount){
			if(!resource) {
				Utils.debug.log('Gaining invalid resource');
			} else if(!resource.get('unlocked')) {
				Utils.debug.log('Gaining locked resource');
			} else {
				var currentCount = resource.get('count');
				resource.set('count', currentCount + amount);
			}

		},
		loseResource: function(resource, amount){
			this.gainResource(resource, amount*-1);
		},
		gatherIncome: function(income){
			_.each(income, function(quantity, resourceName){
				this.gainNamedResource(resourceName, quantity);
			}, this);
		}

	});
});