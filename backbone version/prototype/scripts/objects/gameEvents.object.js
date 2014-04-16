define(['Global', 'EffectUtilities'], function(G, Effects){
	var idCount = 0;
	return [
		//Intro
		{id: idCount++, name: 'intro.alone',
			unlocked: true, instantTrigger: true, mandatory: true, once: true, unlockable: false,
			text: 'You are alone',
			choices: [
				{text: 'Continue', effect: function(){
					Effects.unlockEvent('intro.lastNight');
				}}
				// {text: 'I have no interest in your introductions!', effect: function(){
				// 	Effects.unlockResource('food');
				// 	Effects.unlockResourceAction('getFood');	
				// 	Effects.unlockResource('wood');
				// 	Effects.unlockResourceAction('getWood');
				// 	Effects.unlockBuilding('hut');
				// 	Effects.disableEvent()

				// }}
			]
		},
			{id: idCount++, name: 'intro.lastNight',
				unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
				text: 'The memory of last night fills you with regret',
				choices: [
					{text: 'Continue', effect: function(){
						Effects.unlockEvent('intro.castOut');
					}}
				]
			},
				{id: idCount++, name: 'intro.castOut',
					unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
					text: 'You have been cast out of your vllage and now',
					choices: [
						{text: 'I am alone', effect: function(){
							Effects.unlockResource('food');
							Effects.unlockResourceAction('getFood');
						}}
					]
				},
		{id: idCount++, name: 'intro.shelter',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
			prereqs: {resourceActions: {getFood: 4}},
			text: 'The axe your village left you with is in poor condition, but it can still chop and you will need shelter soon.',
			choices: [
				{text: 'Better get started.', effect: function(thisEvent){
					Effects.unlockResource('wood');
					Effects.unlockResourceAction('getWood');
					Effects.unlockBuilding('hut');
					thisEvent.set('unlockable', false);
				}}
			]
		},
		{id: idCount++, name: 'intro.volcano',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
			prereqs: {resourceActions: {getWood: 5}},
			text: 'You hear a loud explosion in the distance.',
			choices: [
				{text: 'Continue', effect: function(thisEvent){
						Effects.unlockEvent('intro.volcano.sky');
						thisEvent.set('unlockable', false);
					}
				}
			]
		},
			{id: idCount++, name: 'intro.volcano.sky',
				unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
				text: 'The sky is filling with a black cloud of ash. The volcano at the centre of the island has errupted.',
				choices: [
					{text: 'I should help my village', effect: function(){
						Effects.unlockEvent('intro.volcano.nopath');
					}},
					{text: 'I should look after myself', effect: function(){
						Effects.unlockEvent('intro.volcano.safety');
					}}
				]
			},
				{id: idCount++, name: 'intro.volcano.nopath',
					unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
					text: 'You soon find yourself faced with a river of lava with no path across',
					choices: [
						{text: 'I should get to safety', effect: function(){
							Effects.unlockEvent('intro.volcano.safety');
						}},		
						{text: 'My village needs me', effect: function(){
							Effects.unlockEvent('intro.volcano.heroics');
						}}
					]
				},
					{id: idCount++, name: 'intro.volcano.heroics',
						unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
						text: 'You perform some heroics and get to the village. I need to add some better flavour here.',
						choices: [
							{text: 'Continue', effect: function(){
								Effects.unlockEvent('intro.volcano.village');
							}}
						]
					},
						{id: idCount++, name: 'intro.volcano.village',
							unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
							text: 'The village is flooded with lava. If anyone has survived, they aren\'t here anymore',
							choices: [
								{text: 'I should get to safety', effect: function(){
									Effects.unlockEvent('intro.volcano.safety');
								}}
							]
						},
							{id: idCount++, name: 'intro.volcano.safety',
								unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
								text: 'You make your way away from the path of the lava. The ash cloud makes it hard to breathe but you take cover until it is safe to emerge',
								choices: [
									{text: 'I should go to see my village', effect: function(){
										Effects.unlockEvent('intro.volcano.desolation');
									}},
									{text: 'I still need shelter'}
								]
							},
							{id: idCount++, name: 'intro.volcano.desolation',
								unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
								text: 'The village has been completely destroyed. A small number of bodies are mixed in amongst the ruins.',
								choices: [
									{text: 'Maybe I can salvage some wood', effect: function(){
										Effects.gainResource(3, 'wood');
									}},
									{text: 'There are too many memories here. I need to build a shelter.'}
								]
							},
		{id: idCount++, name: 'intro.earthquake',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
			prereqs: {resourceActions: {getWood: 10}},
			text: 'The ground rumbles beneath you. The stories you have heard about erruptions in the past suggest that this is normal. If you had a shelter, it would probably have collapsed.',
			choices: [
				{text: 'Score one for the slow builders!'},
				{text: 'It\'s coming.'}
			]
		},
		{id: idCount++, name: 'intro.shipSurvivor',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
			prereqs: {resourceActions: {getWood: 12}},
			text: 'On your way back from chopping wood you find someone washed up on the beach. They are soaking wet and unconcious',
			choices: [
				{text: 'I should help them', effect: function(thisEvent){
					Effects.unlockEvent('intro.shipSurvivor.help');
				}},
				{text: 'I should loot them', effect: function(thisEvent){
					Effects.unlockEvent('intro.shipSurvivor.loot');
				}},
				{text: 'I have a shelter to build.', effect: function(thisEvent){
					Effects.unlockEvent('intro.shipSurvivor.ignore');		
				}}
			]
		},
			{id: idCount++, name: 'intro.shipSurvivor.help',
				unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
				text: 'You take them back to your not-yet-a-shelter, where they splutter awake.',
				choices: [
					{text: 'Continue', effect: function(){
						Effects.unlockEvent('intro.shipSurvivor.communication');
					}}
				]
			},
			{id: idCount++, name: 'intro.shipSurvivor.loot',
				unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
				text: 'You start rummaging through their pockets but they splutter awake. Luckily, they don\'t seem to realise what you were doing',
				choices: [
					{text: 'Continue', effect: function(){
						Effects.unlockEvent('intro.shipSurvivor.communication');
					}}
				]
			},
			{id: idCount++, name: 'intro.shipSurvivor.ignore',
				unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
				text: 'You ignore them and walk past, but they splutter awake and chase after you, shouting.',
				choices: [
					{text: 'Continue', effect: function(){
						Effects.unlockEvent('intro.shipSurvivor.communication');
					}}
				]
			},
					{id: idCount++, name: 'intro.shipSurvivor.communication',
						unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
						villageData: [{name: G.eventVillageData.newVillagers, notNative: {any:1}}],
						text: '<%=newVillagers[0].subPronoun%> speaks a strange language you don\'t understand but seems friendly. You communicate by drawing in the sand.',
						choices: [
							{text: 'Continue',
							rememberData: [
								{data:G.eventVillageData.newVillagers, forEvent: 'intro.shipSurvivor.names'},
								{data:G.eventVillageData.newVillagers, forEvent: 'intro.shipSurvivor.foraging'}
							],
							effect: function(){
								Effects.unlockEvent('intro.shipSurvivor.names');
							}}
						]
					},
						{id: idCount++, name: 'intro.shipSurvivor.names',
							unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
							text: 'You are able to establish that <%=memory.newVillagers[0].subPronoun%> calls <%=memory.newVillagers[0].subPronoun%>self <%=memory.newVillagers[0].name%> and would like to know your name',
							choices: [
								{text: 'Give them your name', effect: function(){
									Effects.unlockCulture('trusting');
									Effects.unlockEvent('intro.shipSurvivor.foraging');
								}},
								{text: 'I don\'t trust them yet', effect: function(){
									Effects.unlockCulture('suspicious');
									Effects.unlockEvent('intro.shipSurvivor.foraging');
								}}
							]
						},
							{id: idCount++, name: 'intro.shipSurvivor.foraging',
								unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
								text: '<%=memory.newVillagers[0].subPronoun%> has no axe to help chopping wood, but goes to gather food for you both.',
								choices: [
									{text: 'Continue', effect: function(thisEvent, thisEventOptions){
										Effects.unlockJob(G.variables.workerPoolName);
										Effects.gainVillagersAbovePopLimit(thisEventOptions.memory.newVillagers);
									}}
								]
							},
		{id: idCount++, name: 'intro.construction',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
			prereqs: {buildings:{hut: 1}},
			villageData: [{name: G.eventVillageData.villagers, any: 1}],
			text: 'With <%=villagers[0].name%>\'s help, you turn your pile of wood into a simple hut.',
			choices: [{text: 'Continue', effect: function(){
				Effects.unlockEvent('intro.shelter.language');
			}}]
		},
			{id: idCount++, name: 'intro.shelter.language',
				unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
				text: 'Two of you talk, still drawing in the sand but also starting to understand what each other say',
				choices: [{text: 'Continue', effect: function(){
					Effects.unlockEvent('intro.shelter.progress');
				}}]
			},
				{id: idCount++, name: 'intro.shelter.progress',
					unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: true,
					text: 'You try to decide what comes next. One of you wants to weave vines intro rope so you can sure up the hut and make tools. The other wants to try and cultivate a small farm.',
					choices: [
						{text: 'I\'ve had enough of this axe.', effect: function(){
							Effects.unlockJob('ropemaker');
							Effects.unlockResource('rope');
							Effects.unlockResourceAction('makeRope');
							Effects.unlockUpgrade('woodenAxes');
							Effects.enableEvent('intro.shelter.axe');
						}},
						{text: 'We need to find something better than foraging before the winter.', effect: function(){
							Effects.unlockBuilding('farm');
							Effects.enableEvent('intro.shelter.farm');
						}},
						{text: 'I see no reason why we can\'t pursue both.', effect: function(){
							Effects.unlockBuilding('farm');
							Effects.unlockJob('ropemaker');
							Effects.unlockResource('rope');
							Effects.unlockResourceAction('makeRope');
							Effects.unlockUpgrade('woodenAxes');
							Effects.enableEvent('intro.villageSurvivor');
						}}
					]
				},
				{id: idCount++, name: 'intro.shelter.axe',  
					unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
					prereqs: {upgrades:['woodenAxes']},
					text: 'You\'ve gotten pretty good at making axes out of wood and rope. Both of you now have some fine wooden axes. They\'re still just made out of wood though.',
					choices: [
						{text: 'Let\'s make a farm then.', effect: function(){
							Effects.unlockBuilding('farm');
							Effects.unlockEvent('intro.villageSurvivor');
						}},
					]
				},
				{id: idCount++, name: 'intro.shelter.farm', 
					unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
					prereqs: {buildings: {farm: 1}},
					text: 'You have created a farm, food will be more readily available',
					choices: [
						{text: 'I can finally replace this sodding axe!', effect: function(){
							Effects.unlockUpgrade('woodenAxes');
							Effects.unlockEvent('intro.villageSurvivor');
						}},
					]
				},
		{id: idCount++, name: 'intro.villageSurvivor',
			unlocked: false, mandatory: true, once: true, unlockable: false,
			villageData: [{name: G.eventVillageData.newVillagers, native: {any:1}}],
			prereqs: {upgrades: ['woodenAxes']},
			text: '<%=newVillagers[0].name%> from your old village stumbles upon your hut, <%=newVillagers[0].subPronoun%> looks haggard',
			choices: [
				{text: 'Continue',
					rememberData: [
						{data:G.eventVillageData.newVillagers, forEvent: 'intro.villageSurvivor.memories'},
						{data:G.eventVillageData.newVillagers, forEvent: 'intro.villageSurvivor.friendly'},
						{data:G.eventVillageData.newVillagers, forEvent: 'intro.villageSurvivor.hostile'},
						{data:G.eventVillageData.newVillagers, forEvent: 'intro.villageSurvivor.friendly.stone'},
						{data:G.eventVillageData.newVillagers, forEvent: 'intro.villageSurvivor.hostile.stone'}
					], 
					effect: function(){
						Effects.unlockEvent('intro.villageSurvivor.memories');
					}
				}
			]
		},
		{id: idCount++, name: 'intro.villageSurvivor.memories',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
			text: '<%=memory.newVillagers[0].name%> was one of the first to speak out against you when you were exiled, but <%=memory.newVillagers[0].subPronoun%> is clearly pleased to see you',
			choices: [
				{text: 'Now is not the time for grudges', effect: function(){
					Effects.unlockEvent('intro.villageSurvivor.friendly');
				}},
				{text: 'The village rejected me and now I reject them', effect: function(){
					Effects.unlockEvent('intro.villageSurvivor.hostile');
				}}
			]	
		},
		{id: idCount++, name: 'intro.villageSurvivor.friendly',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
			text: '<%=memory.newVillagers[0].name%> tells you that the village evacuated after the erruption but many of them were lost in the forest. And in the lava.',
			choices: [
				{text: 'Continue', effect: function(){
					Effects.unlockEvent('intro.villageSurvivor.friendly.stone');
				}}
			]	
		},
		{id: idCount++, name: 'intro.villageSurvivor.friendly.stone',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
			text: '<%=memory.newVillagers[0].subPronoun%> says <%=memory.newVillagers[0].subPronoun%> has found a good supply of stone which could be used to construct some better tools.',
			choices: [
				{text: 'That will be useful', effect: function(thisEvent, thisEventOptions){
					Effects.unlockResource('stone');
					Effects.unlockResourceAction('getStone');
					Effects.unlockJob('miner');
					Effects.unlockUpgrade('stoneAxes');
					Effects.gainVillagersAbovePopLimit(thisEventOptions.memory.newVillagers);
					Effects.startPhase(1);
				}}
			]			
		},
		{id: idCount++, name: 'intro.villageSurvivor.hostile',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
			text: '<%=memory.newVillagers[0].subPronoun%> responds to your hostility by beginning for forgiveness, saying <%=memory.newVillagers[0].subPronoun%> can help, that <%=memory.newVillagers[0].subPronoun%> can lead you to a useful supply of stone',
			choices: [
				{text: 'Forgiveness is a virtue', effect: function(){
					Effects.unlockEvent('intro.villageSurvivor.friendly');
				}},
				{text: 'They are on their own.', effect: function(){
					Effects.unlockEvent('intro.villageSurvivor.hostile.stone');
				}}
			]	
		},
		{id: idCount++, name: 'intro.villageSurvivor.hostile.stone',
			unlocked: false, instantTrigger: true, mandatory: true, once: true, unlockable: false,
			text: '<%=memory.newVillagers[0].name%> leaves. <%=memory.newVillagers[0].subPronoun%> will probably not survive long alone. It is not long before you find the stone she spoke about anyway',
			choices: [
				{text: 'Good riddence', effect: function(){
					Effects.unlockResource('stone');
					Effects.unlockJob('miner');
					Effects.unlockUpgrade('stoneAxes');
					Effects.unlockCulture('vengeful');
					Effects.startPhase(1);
				}}
			]			
		},
		// {id: idCount++, name: 'phase1.genericRandomEvent',
		// 	unlocked: false, unlockable: true, 
		// 	prereqs: {phase: 1},
		// 	text: 'A random event occurs. These haven\'t been implemented yet, so let\'s say you stubbed your toe',
		// 	choices: [
		// 		{text: 'OW'}
		// 	]
		// },
		{id: idCount++, name: 'phase1.genericRandomEventWithoutHuts',
			unlocked: false, unlockable: true, lockable: true,
			prereqs: {phase: 1},
			postreqs: {buildings:{hut: 2}},
			text: 'A random event which can only be triggered when you don\'t have two huts occurs. It\'s not implemented yet. So you feel sad at your inadequate building skills?',
			choices: [
				{text: 'I\'m doing my best'}
			]
		},
		{id: idCount++, name: 'phase1.genericRandomEventWithHuts',
			unlocked: false, unlockable: true, 
			prereqs: {phase: 1, buildings:{hut:2}},
			text: 'A random event which can only be triggered when you have two huts occurs. It\'s not implemented yet. So, you, move house?',
			choices: [
				{text: 'That seems unnecessary!'}
			]
		}


		//game effects
		// {id: idCount++, name: 'starvationComing', unlockable: false, text: 'The villagers are getting concerned about dwendelling food supplies.', choices: [
		// 	{text: 'Continue'}
		// ]},
		// 	{id: idCount++, name: 'villagersStarved', unlockable: false, text: 'Starvation has set in. <%=number%> villagers have died.', choices: [
		// 		{text: 'Continue', options: {number: 'Some'}}
		// 	]}
				// {id: idCount++, name: 'youStarved', unlockable: false, text: 'You have starved', choices: [
				// 	{text: 'Continue', effect: function() {alert("There should be an effect here. This is as close as the game gets to  a lose state. Loser. You should feel bad.");}}
				// ]},
		// {id: idCount++, name: 'eatMore', unlocked: true, villageData: [{name: G.eventVillageData.villagers, any: 2}],
		// 	text: 'Until now you have kept a tight control over food supplies. <%=villagers[0].name%> and <%=villagers[1].name%> feel that it is time these restrictions were loosened',
		// 	choices: [
		// 		{text: 'Go wild, we\'ve got plenty of food',
		// 			description: 'Village food consumption will be increased by 1 for each villager',
		// 			rememberData: [{data: G.eventVillageData.villagers, forEvent:'eatEvenMore'}],
		// 			effect: function(){
		// 				Backbone.Mediator.publish(G.events.developCulture, 'decadent');
		// 				Backbone.Mediator.publish(G.events.destroyCulture, 'stingy');
		// 				Backbone.Mediator.publish(G.events.modifyVillage, 'consumption', ['+', 1]);
		// 				Backbone.Mediator.publish(G.events.lockEvent, 'eatMore');
		// 				Backbone.Mediator.publish(G.events.unlockEvent, 'eatEvenMore');
		// 			}
		// 		},
		// 		{text: 'No. Food is scarce',
		// 			description: 'The villagers won\'t be happy',
		// 			effect: function(){
		// 				Backbone.Mediator.publish(G.events.destroyCulture, 'decadent');
		// 				Backbone.Mediator.publish(G.events.developCulture, 'stingy');
		// 				Backbone.Mediator.publish(G.events.modifyVillage, 'consumption', ['=', 1]);
		// 			}
		// 		}
		// 	]
		// },
		// 	{id: idCount++, name: 'eatEvenMore', unlocked: false, unlockable: false,
		// 		text: '<%=memory.villagers[0].name%> and <%=memory.villagers[1].name%> think we could afford to let everyone eat a little more',
		// 		instantTrigger: true,
		// 		choices: [
		// 			{text: 'YES',
		// 				description: 'Consumption will be doubled',
		// 				effect: function(){
		// 					Backbone.Mediator.publish(G.events.modifyVillage, 'consumption', ['+', 1]);
		// 				}
		// 			},
		// 			{text: 'Hell no.', effect: function(){
		// 					console.log('People can\'t eat enough. You monster');
		// 				}
		// 			}
		// 		]
		// 	}

	];

});
