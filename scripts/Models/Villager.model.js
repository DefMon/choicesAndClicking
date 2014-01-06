define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'A villager',
			isMale: false,
			isNative: false
		}
	});
});