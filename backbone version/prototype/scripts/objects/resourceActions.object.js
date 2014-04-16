define(['Global'], function(G){
	var idCount = 0;
	return [
		{id: idCount++, name: 'getFood', title:'Forage', cooldown: 1000, income: {food: 1}},
		{id: idCount++, name: 'getWood', title:'Chop wood', cooldown: 1000, income: {wood: 0.5}},
		{id: idCount++, name: 'makeRope', title: 'Weave rope', cooldown: 2000, income: {rope: 1}},
		{id: idCount++, name: 'getStone', title: 'Gather stones', cooldown: 2000, income: {stone: 1}}
	
	];
});