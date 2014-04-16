define(function(){
	var idCount = 0;
	return [
		{id: idCount++, name: 'shovels', title:'Shovels', unlocked: true, description:'You can stop digging with your bare hands', cost: {wood: 1000},
			onbuild: function(){
				Backbone.Mediator.publish(G.events.upgradeJob, {
					farmer:{
						income:{food:['*', 2]}
					}
				});
			}
		},
		{id: idCount++, name: 'spears', title:'Spears', unlocked: true, description:'Foragers can now hunt', cost: {wood: 500},
			onbuild: function(){
				Backbone.Mediator.publish(G.events.upgradeJob, {forager:{income: {food: ['+',2]}}});
			}
		},
		{id: idCount++, name:'axes', title: 'Axes', unlocked: false, description: 'Lumberjacks can chop better', cost: {wood: 700},
			onbuild: function(){
				Backbone.Mediator.publish(G.events.upgradeJob, {lumberjack:{income: {wood: ['+',2]}}});
			},
			prereqs: {
				buildings: {
					hut: 5,
					megaFarm: 1
				},
				upgrades: ['shovels', 'spears']
			}
		}
	];
});