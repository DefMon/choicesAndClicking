define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'aJob',
			title: 'A Job',
			priority: 0,
			unlocked: false,
			cost: false,
			income: {},
			count: 0,
			max: 0,
			description: ''
		}
	});
});