define(['Global'], function(G){
	return Backbone.Model.extend({
		defaults: {
			id: '',
			name: 'An event',
			isOneOff: false,
			isInstant: false,
			isNext: false,
			isEnabled: false,
			isUnlocked: true,
			choices: [
				{
					text: 'Continue'
					//Optional attribute
					//effects: function(){}
					//possibly an array of references to functions so that the whole thing is valid JSON. It'd save dirty hacks later
				}
			],
			village: {},
			//Derived attribute from village
			// locks: [],
			//Optional attribute
			// always: function(){}

		},
		initialize: function(){
			this.locks = [];
			// Calculate locks based on Village. Is this too demanding to do on every load?
			if(this.locks.length > 0) {
				this.isUnlocked = false;
			}
		}
	});
});