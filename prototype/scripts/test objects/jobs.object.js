define(function(){
	var idCount = 0;
	return [
		{id: idCount++, name: 'forager', title: 'Forager', priority: 0, unlocked: true, count: 10, income: {food: 2}, description: 'Looks for food'},
		{id: idCount++, name: 'farmer', title: 'Farmer', priority: 0, unlocked: false, max: 0, income: {food: 5}, description: 'Produces food'},
		{id: idCount++, name: 'lumberjack', title: 'Lumberjack', priority: 1, unlocked: true, income: {wood: 0.5}, description: 'Cuts down trees'}
	];
});