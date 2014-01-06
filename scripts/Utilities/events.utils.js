define(['Global'], function(G){
	return {
		trigger: function(eventName, args) {
			Backbone.Mediator.publish.apply(this, arguments);
		}
	}
});