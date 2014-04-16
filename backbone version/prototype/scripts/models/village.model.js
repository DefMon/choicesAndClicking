define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			name: 'village',
			title: 'The Village',
			pop: 1,
			popCap: 0,
			villagers: [],
			consumption: 1
		}
	});
});