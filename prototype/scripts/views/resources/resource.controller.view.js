define([
	'Global', 'ResourcesCollection', 'ResourceActionsCollection', 'ResourceView', 'ResourceActionView', 'Utilities'
], function(G, ResourcesCollection, ResourceActionsCollection, ResourceView, ResourceActionView, Utils){
	return Backbone.View.extend({
		subscriptions: {
			'action:resource'			: 'resourceAction',
			'unlock:action:resource'	: 'unlockResourceAction',
			'unlock:resource'			: 'unlockResource',
			'jobs:income'				: 'workerIncome',
			'gain:resource'				: 'store',
			'upgrade:action:resource'	: 'upgradeNamedResourceAction'
		},
		initialize: function(element, actionsElement, resources, resourceActions){
			this.setElement(element);
			this.$actionsElement = $(actionsElement);
			
			this.collection = new ResourcesCollection(resources);
			this.collection.fetch({remove: false});
			this.actionsCollection = new ResourceActionsCollection(resourceActions);
			this.actionsCollection.fetch({remove: false});
		
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
				item.save();
				if(item.get('unlocked')){
					this.renderItem(item);
				}
			}, this);

			this.actionsCollection.each(function(action){
				action.set('disabled', false);
				action.save();
				if(action.get('unlocked')) {
					this.renderAction(action);
				}
			}, this);
	
		},
		unlockResource: function(resourceName){
			var unlockedResource = this.collection.findWhere({name: resourceName});
			if(!unlockedResource.get('unlocked')) {
				unlockedResource.set('unlocked', true);
				unlockedResource.save();;
				this.renderItem(unlockedResource);
			}
		},
		unlockResourceAction: function(actionName){
			var unlockedAction = this.actionsCollection.findWhere({name: actionName});
			if(!unlockedAction.get('unlocked')){
				unlockedAction.set('unlocked', true);
				unlockedAction.save();
				this.renderAction(unlockedAction);
			}
		},
		renderAction: function(action) {
			var actionView = new ResourceActionView({model: action});
			this.$actionsElement.find('ul').append(actionView.render().el);
		},
		renderItem: function(item) {
			var itemView = new ResourceView({model: item});
			this.$el.find('ul').append(itemView.render().el);
		},
		payCost: function(cost, title, suppressMessage){
			var paid = false,
				action = title || 'action',
				ResourceController = this;
			function checkStores() {
				var failMessage = action + ' failed. Not enough ',
					sufficientResources = true;
				function appendToFailMessage(firstItem, resourceName) {
					if(firstItem) {
						failMessage = failMessage + resourceName;
					} else {
						failMessage = failMessage +' or '+resourceName;
					}
				}
				_.each(cost, function(quantity, resourceName){
					var resource = ResourceController.collection.findWhere({name:resourceName});
					if (resource) {
						if (Math.floor(resource.get('count')) < quantity) {
							appendToFailMessage(sufficientResources, resourceName);
							sufficientResources = false;
						}
					} else {
						Backbone.Mediator.publish(G.events.feedError, resourceName+' doesn\'t exist. What are you trying to pull?');
						appendToFailMessage(sufficientResources, resourceName);
						sufficientResources = false;
					}
				});
				if(!sufficientResources && !suppressMessage) {
					Backbone.Mediator.publish(G.events.feedWarning, failMessage);
				}
				return sufficientResources;
			}

			if(checkStores()) {
				_.each(cost, function(quantity, resourceName){
					ResourceController.spend(resourceName, quantity);
				});
				return true;
			} else {
				return false;
			}
		},
		feedPopulation: function(population, costPerPerson) {
			var foodStore = this.collection.findWhere({name: 'food'}),
				totalConsumption = population * costPerPerson;
			if(foodStore.get('count') <= totalConsumption) {
				var shortfall = Math.ceil((totalConsumption - foodStore.get('count'))/costPerPerson);
				foodStore.set('count', 0);
				return shortfall;
			} else {
				foodStore.set('count', foodStore.get('count') - totalConsumption);
				return 0;
			}
		},
		resourceAction: function(title, cost, income){
			if(this.payCost(cost, title)){
				this.collectIncome(income);
			}
		},
		store: function(resourceName, quantity) {
			var model = this.collection.findWhere({name:resourceName}),
				resourceLeft = model.get('available');
			if(resourceLeft) {
				if(resourceLeft > quantity) {
					model.set('available', resourceLeft - quantity);
				} else {
					model.set('available', 0);
					quantity = resourceLeft;
					alert("You have run out of "+resourceName);
				}
			}
			model.set('count', model.get('count') + quantity);
		},
		spend: function(resourceName, quantity) {
			this.store(resourceName, quantity*-1);
		},
		collectIncome: function(income) {
			var ResourceController = this;
			_.each(income, function(quantity, resourceName){
				ResourceController.store(resourceName, quantity);
			});
		},
		workerIncome: function(cost, income, count, title) {
			for( var i = count; i--;) {
				if(this.payCost(cost, title, true)){
					this.collectIncome(income);
				} else {
					break;
				}
			}
		},
		upgradeNamedResourceAction: function(actionName, improvements) {
			var action = this.actionsCollection.findWhere({name: actionName});
			_.each(improvements, function(upgrade, propertyName){
				Utils.modifyProperty(action, propertyName, upgrade);
			});

		}
	});
});