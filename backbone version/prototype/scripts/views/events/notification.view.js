define(['Global', 'GameEventsObject', 'text!templates/notification.template.html'], function(G, GameEvents, Template){
	var NotificationView = Backbone.View.extend({
		tagName: 'div',
		className: 'notification',
		template: _.template(Template),
		events: {
			'click .choiceButton' : 'makeChoice'
		},
		initialize: function(){
			this.model.on('change', this.update, this);
		},
		render: function(options){
			var alert = this.model.toJSON();
			this.currentAlertOptions = options;
			if(options){
				alert.options = options;
			}
			if(alert.options) {
				alert.text = _.template(alert.text)(alert.options);
			}
			this.$el.html(this.template(alert));
			$('#veil').show();
			return this;
		},
		update: function(){
			this.model.save();
		},
		makeChoice: function(e){
			var choiceNumber = $(e.target).data('choicenumber'),
				choice = _.findWhere(GameEvents, {id: this.model.get('id')}).choices[choiceNumber],
				wait = choice.wait,
				currentAlertOptions = this.currentAlertOptions,
				rememberData = choice.rememberData,
				followUp = choice.followUp;
			this.remove();
			$('#veil').hide();

			if(rememberData) {
				_.each(rememberData, function(memoryRequired){
					Backbone.Mediator.publish(G.events.rememberEventData, memoryRequired.forEvent, currentAlertOptions);
				});
			}
			
			if (choice.effect) {
				choice.effect(this.model, currentAlertOptions);
			}
			if(followUp) {
				Backbone.Mediator.publish(G.events.triggerEvent, followUp);
			} else {
				Backbone.Mediator.publish(G.events.checkEventQueue);
			}
			if (this.model.get('once')) {
				this.model.set('unlocked', false);
				this.model.set('unlockable', false);
			}
			this.currentAlertOptions = null;
		}
	});
	return NotificationView;
});