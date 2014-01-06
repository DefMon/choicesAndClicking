define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'sandCastle',
			title: 'Sand Castle',
			count: 0,
			cost: {},
			costCurve: 1.5,
			max: false,
			unlocked: false,
			disabled: false,
			description: 'This building has no description',
			buildSettings: {},
			onbuild: function(){return false;},
			prereqs: {}
		}
	});
});