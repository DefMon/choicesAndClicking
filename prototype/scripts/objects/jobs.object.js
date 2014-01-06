define(function(){
	var idCount = 0;
	return [
		{id: idCount++, name: 'forager', title: 'Forager', priority: 0, unlocked: false, income: {food: 2}, description: 'Looks for food'},
		{id: idCount++, name: 'lumberjack', title: 'Lumberjack', priority: 1, unlocked: false, income: {wood: 0.5}, description: 'Cuts down trees'},
		{id: idCount++, name: 'ropemaker', title: 'Rope weaver', priority: 1, unlocked: false, income: {rope: 1}, description: 'Weaves vines into rope'},
		{id: idCount++, name: 'miner', title: 'Stone collector', priority: 1, unlocked: false, income: {stone: 0.5}, description: 'Collects loose stones'},
		{id: idCount++, name: 'farmer', title: 'Farmer', priority: 0, unlocked: false, income: {food: 4}, max: 0, description: 'Cultivates food'}
	];
});