define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'Sand',
			unlocked: false,
			count: 0
		}
	});
});