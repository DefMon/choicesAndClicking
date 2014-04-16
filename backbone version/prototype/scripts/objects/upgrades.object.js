define(['Global', 'EffectUtilities'], function(G, Effects){
	var idCount = 0;
	return [
		{id: idCount++, name: 'woodenAxes', title:'Wooden axes', unlocked: false, description:'Allows others to chop wood too.', cost: {rope: 2, wood:10},
			onbuild: function(){
				Effects.unlockJob('lumberjack');
				Effects.upgradeResourceAction('getWood', {income: {wood: ['*', 2]}});
			}
		},
		{id: idCount++, name: 'stoneAxes', title:'Stone axes', unlocked: false, description:'Makes lumberjacks Faster', cost: {rope: 2, wood:40, stone: 20},
			onbuild: function(){
				Effects.upgradeJob({
					lumberjack:{
						income:{wood:['+', 1]}
					}
				});
				Effects.upgradeResourceAction({
					getWood:{
						income:{wood:['+',1]}
					}
				});
			}
		}
	];
});