define(function(){
	var idCount = 0;
	return [
			{id: idCount++, name: 'trusting', title: 'Trusting', description: 'You are quick to trust strangers'},
			{id: idCount++, name: 'suspicious', title: 'Suspicious', description: 'You are distrustful of strangers'},
			{id: idCount++, name: 'vengeful', title:'Vengeful', description: 'Your village rejected you and you hold a grudge'}
	];
});