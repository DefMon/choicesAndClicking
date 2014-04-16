define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			type: 'message',
			text: 'A thing happened'
		}
	});
});