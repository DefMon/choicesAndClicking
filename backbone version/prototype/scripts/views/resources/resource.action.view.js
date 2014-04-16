define(['Global', 'text!templates/action.button.template.html'], function(G, ButtonTemplate){
	return Backbone.View.extend({
		tagName: 'li',
		className: 'action resourceAction',
		template: _.template(ButtonTemplate),
		events: {
			'click .actionButton' : 'triggerAction'
		},
		initialize: function(){
			this.model.on('change', this.update, this);
		},
		update: function(){
			this.model.save();
		},
		render: function(){
			if(this.model.get('unlocked')) {
				this.$el.html(this.template(this.model.toJSON()));
			} else {
				this.remove();
				this.$el.remove();
			}
			return this;
		},
		cooldown: function(){
			var action = this.model,
				button = this.$el.find('.actionButton');
			button.prop('disabled', true);
			setTimeout(function(){
				button.prop('disabled', false);
			}, action.get('cooldown'));
			return this;
		},
		triggerAction: function() {
			this.model.set('count', this.model.get('count')+1);
			Backbone.Mediator.publish(G.events.resourceAction, this.model.get('title'), this.model.get('cost'), this.model.get('income'), this.model.get('name'), this.model.get('count'));
			this.cooldown();
		}
	});
});