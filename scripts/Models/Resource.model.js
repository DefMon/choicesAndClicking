define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'aResource',
			unlocked: false,
			count: 0
		}
	});
});