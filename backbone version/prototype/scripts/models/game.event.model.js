define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			text: 'A thing happened',
			name: 'untriggerable',
			villageData: [],
			prereqs: {},
			eventMemory: {},
			unlocked: false,
			unlockable: true,
			lockable: false,
			postreqs: {},
			choices: [
				{text: 'Ok', options: {}, effect: function(){return false;}}
			]
		}
	});
});