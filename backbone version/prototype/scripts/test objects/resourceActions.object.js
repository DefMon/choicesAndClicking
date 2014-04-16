define(['Global'], function(G){
	var idCount = 0;
	return [
		{id: idCount++, name: 'cheat', title:'Cheat!', cost: {food :1}, income: {food: 10000, wood: 10000}, unlocked: G.variables.developmentMode, description: 'Gain loads of everything'},
		{id: idCount++, name: 'forage', title:'Forage', cooldown: 1000, income: {food: 1}, unlocked: true, description: 'Forage for food.'},
		{id: idCount++, name: 'chopWood', title:'Chop wood', cooldown: 1000, income: {wood: 1}, unlocked:false, description: 'Cut down some trees.'}
	];
});