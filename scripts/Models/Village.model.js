define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			id: 1,
			name: 'village',
			title: 'The Village',
			popCount: 1,
			popCap: 0,
			foodConsumption: 1,
			season: 0,
			villagers: []
		}
	});
});