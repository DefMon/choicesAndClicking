define(['Global', 'text!templates/action.button.template.html'], function(G, ButtonTemplate){
	return Backbone.View.extend({
		tagName: 'li',
		className: 'action',
		template: _.template(ButtonTemplate),
		events: {
			'click .actionButton' : 'triggerAction'
		},
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		render: function(){
			if(!this.model.get('built')) {
				this.$el.html(this.template(this.model.toJSON()));
			} else {
				this.remove();
			}
			return this;
		},
		triggerAction: function(){
			Backbone.Mediator.publish(G.events.upgraderAction, this.model.id, this.model.get('cost'), 'Build '+this.model.get('title'));
		}
	});
});