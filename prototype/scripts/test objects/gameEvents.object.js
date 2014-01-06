define(['Global'], function(G){
	var idCount = 0;
	return [
		{id: idCount++, name: 'intro1', unlocked: true, once: true, unlockable: false, text: 'You are alone', instantTrigger: true, mandatory: true, 
		choices: [
			{text: 'Continue', followUp: 'intro2'}
		]},
			{id: idCount++, name: 'intro2', unlockable: false, once: true, text: 'The memory of last night fills you with regret', instantTrigger: true, mandatory: true, 
			choices: [
				{text: 'Continue', followUp: 'intro3'}
			]},
				{id: idCount++, name: 'intro3', unlockable: false, once: true, text: 'Your village has cast you out and now', instantTrigger: true, mandatory: true, 
				 choices: [
					{text: 'I am alone.'}
				]},
					{id: idCount++, name: 'introShelter', unlockable: true, once: true, instantTrigger: true, mandatory: true,
						prereqs: {resourceActions: {forage: 1}},
						text: 'You will need to build a shelter soon. The axe your village left you with is in poor condition, but it should still chop', choices: [
						{
							effect: function(){
								Backbone.Mediator.publish(G.events.unlockResourceAction, 'chopWood');
								Backbone.Mediator.publish(G.events.unlockBuilding, 'hut');		
							},
							text: 'Better get started'
						}
					]},
		{id: idCount++, name: 'villagersStarved', unlockable: false, text: 'Starvation has set in. <%=number%> villagers have died.', choices: [
			{text: 'Continue', options: {number: 'Some'}}
		]},
			{id: idCount++, name: 'youStarved', unlockable: false, text: 'You have starved', choices: [
				{text: 'Continue', effect: function() {alert("There should be an effect here. This is as close as the game gets to  a lose state. Loser. You should feel bad.");}}
			]},
		{id: idCount++, name: 'eatMore', unlocked: true, villageData: [{name: G.eventVillageData.villagers, any: 2}],
			text: 'Until now you have kept a tight control over food supplies. <%=villagers[0].name%> and <%=villagers[1].name%> feel that it is time these restrictions were loosened',
			choices: [
				{text: 'Go wild, we\'ve got plenty of food',
					description: 'Village food consumption will be increased by 1 for each villager',
					rememberData: [{data: G.eventVillageData.villagers, forEvent:'eatEvenMore'}],
					effect: function(){
						Backbone.Mediator.publish(G.events.developCulture, 'decadent');
						Backbone.Mediator.publish(G.events.destroyCulture, 'stingy');
						Backbone.Mediator.publish(G.events.modifyVillage, 'consumption', ['+', 1]);
						Backbone.Mediator.publish(G.events.lockEvent, 'eatMore');
						Backbone.Mediator.publish(G.events.unlockEvent, 'eatEvenMore');
					}
				},
				{text: 'No. Food is scarce',
					description: 'The villagers won\'t be happy',
					effect: function(){
						Backbone.Mediator.publish(G.events.destroyCulture, 'decadent');
						Backbone.Mediator.publish(G.events.developCulture, 'stingy');
						Backbone.Mediator.publish(G.events.modifyVillage, 'consumption', ['=', 1]);
					}
				}
			]
		},
			{id: idCount++, name: 'eatEvenMore', unlocked: false, unlockable: false,
				text: '<%=memory.villagers[0].name%> and <%=memory.villagers[1].name%> think we could afford to let everyone eat a little more',
				instantTrigger: true,
				choices: [
					{text: 'YES',
						description: 'Consumption will be doubled',
						effect: function(){
							Backbone.Mediator.publish(G.events.modifyVillage, 'consumption', ['+', 1]);
						}
					},
					{text: 'Hell no.', effect: function(){
							console.log('People can\'t eat enough. You monster');
						}
					}
				]
			}

	];

});
