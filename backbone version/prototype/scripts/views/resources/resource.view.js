define(['Global', 'text!templates/resource.template.html'], function(G, Template){
	return Backbone.View.extend({
		tagName: 'li',
		className: 'resource',
		template: _.template(Template),
		initialize: function(){
			this.model.on('change', this.update, this);
		},
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		},
		update: function(){
			this.render();
			this.model.save();
		}
	});
});