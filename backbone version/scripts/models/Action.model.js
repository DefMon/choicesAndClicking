define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'twiddle',
			title: 'Twiddle your thumbs',
			count: 0,
			disabled: false,
			unlocked: false,
			cost: false,
			income: false,
			description: false,
			cooldown: false,
			effect: false
		}
	});
});