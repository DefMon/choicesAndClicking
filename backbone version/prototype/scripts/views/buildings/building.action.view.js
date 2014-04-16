define(['Global', 'text!templates/action.button.template.html'], function(G, ButtonTemplate){
	return Backbone.View.extend({
		tagName: 'li',
		className: 'action buildingAction',
		template: _.template(ButtonTemplate),
		events: {
			'click .actionButton' : 'triggerAction'
		},
		initialize: function(){
			this.model.on('change', this.render, this);
		},
		render: function(){
			if(this.model.get('unlocked')) {
				this.$el.html(this.template(this.model.toJSON()));
			} else {
				this.$el.remove();
			}
			return this;
		},
		triggerAction: function() {
			Backbone.Mediator.publish(G.events.builderAction, this.model.id, this.model.get('cost'), 'Build '+this.model.get('title') );
		}
	});
});