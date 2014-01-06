define(['Global'], function(G){
	return {
		unlockEvent: function(eventName){
			Backbone.Mediator.publish(G.events.unlockEvent, eventName);
		},
		unlockResource: function(resourceName){
			Backbone.Mediator.publish(G.events.unlockResource, resourceName);
		},
		unlockResourceAction: function(actionName){
			Backbone.Mediator.publish(G.events.unlockResourceAction, actionName);
		},
		unlockBuilding: function(buildingName){
			Backbone.Mediator.publish(G.events.unlockBuilding, buildingName);
		},
		unlockUpgrade: function(upgradeName){
			Backbone.Mediator.publish(G.events.unlockUpgrade, upgradeName);
		},
		unlockCulture: function(cultureName){
			Backbone.Mediator.publish(G.events.unlockCulture, cultureName);
		},
		unlockJob: function(jobName){
			Backbone.Mediator.publish(G.events.unlockJob, jobName);
		},
		gainResource: function(quantity, name){
			Backbone.Mediator.publish(G.events.gainResource, name, quantity);
		},
		gainVillagers: function(villagers){
			Backbone.Mediator.publish(G.events.gainVillagers, villagers);
		},
		gainVillagersAbovePopLimit: function(villagers){
			Backbone.Mediator.publish(G.events.gainVillagers, villagers, true);
		},
		upgradeJob: function(upgrade){
				Backbone.Mediator.publish(G.events.upgradeJob, upgrade);
		},
		startPhase: function(phaseNumber){
			Backbone.Mediator.publish(G.events.startPhase, phaseNumber);
		},
		enableEvent: function(eventName) {
			Backbone.Mediator.publish(G.events.enableEvent, eventName);
		},
		upgradeResourceAction: function(actionName, improvements){
			Backbone.Mediator.publish(G.events.upgradeResourceAction, actionName, improvements);
		}

	}
});