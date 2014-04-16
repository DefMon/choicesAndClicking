define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'defaultUpgrade',
			title: 'Fluffier Clouds',
			cost: {},
			prereqs: {},
			unlocked: false,
			disabled: false,
			built: false,
			description: 'Pretty but useless',
			onbuild: function(){return false;}
		}
	});
});