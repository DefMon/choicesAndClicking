define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'aBuilding',
			title: 'A building',
			count: 0,
			cost: {},
			costCurve: 1.5,
			unlocked: false,
			disabled: false,
			unlockable: false,
			buildable: true,
			description: '',
			options: {},
			onbuild: function(){return false;},
			prerequisites: {},
			//optional
			//max: 0
		}
	});
});