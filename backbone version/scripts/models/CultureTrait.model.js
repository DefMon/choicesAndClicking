define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'aCultureTrait',
			title: 'A Culture Trait',
			unlocked: false,
			disabled: false,
			description: '',
			impact: {},
			onbuild: function(){return false;}
		}
	});
});