define(['Global', 'Utils', 'BaseView', 'text!templates/action.button.template.html'], function(G, Utils, BaseView, ButtonTemplate){
	return BaseView.extend({
		tagName: 'div',
		className: 'action baseAction',
		template: _.template(ButtonTemplate),
		events: {
			'click .actionButton' : 'triggerAction'
		},
		update: function(){
			this.model.save();
		},
		cooldown: function(){
			var action = this.model,
				button = this.$el.find('.actionButton');
			button.prop('disabled', true);
			setTimeout(function(){
				button.prop('disabled', false);
			}, action.get('cooldown'));
		},
		triggerAction: function() {
			this.model.set('count', this.model.get('count')+1);
			Utils.events.trigger(G.events.takeAction, this.model);
			this.cooldown();
		}
	});
});