define(['Global', 'text!templates/job.template.html'], function(G, Template){
	var JobItemView = Backbone.View.extend({
		tagName: 'li',
		className: 'job',
		template: _.template(Template),
		events: {
			'click .jobUp'	: 'assignWorker',
			'click .jobDown': 'unassignWorker'
		},
		initialize: function(){
			this.model.on('change', this.update, this);
		},
		update: function(){
			this.render();
			this.model.save();
			return this;
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		assignWorker: function(){
			Backbone.Mediator.publish(G.events.assignJob, this.model.id);
			return this;
		},
		unassignWorker: function(){
			Backbone.Mediator.publish(G.events.unassignJob, this.model.id);
			return this;
		}
	});
	return JobItemView;
});