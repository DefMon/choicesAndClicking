define(['Global', 'Effects'], function(G, Effects){
	return [
		{
			name: 'hut',
			title: 'Hut',
			cost: {
				wood: 15
			},
			options: {
				popCap: {
					operator: '+',
					amount: 3
				}
			},
			unlocked: true,
			onbuild: function(self){
				var buildingOptions = self.get('options');
				Effects.village.modifyPopCap(buildingOptions.popCap.operator, buildingOptions.popCap.amount);
			}
		}
	];
});