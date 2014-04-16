define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'anUpgrade',
			title: 'An Upgrade',
			cost: {},
			prerequisites: {},
			unlocked: false,
			disabled: false,
			built: false,
			description: '',
			onbuild: function(){return false;}
		}
	});
});