define(['Global'], function(G){
	return {
		introShelter : {
			getStarted: function(){
				Backbone.Mediator.publish(G.events.unlockResourceAction, 'chopWood');
				Backbone.Mediator.publish(G.events.unlockBuilding, 'hut');		
			}
		}
	};
});