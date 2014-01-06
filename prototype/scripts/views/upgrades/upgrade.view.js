define(['Global', 'text!templates/upgrade.template.html'], function(G, Template){
	var ResearchItemView = Backbone.View.extend({
		tagName: 'li',
		className: 'research',
		template: _.template(Template),
		initialize: function(){
			this.model.on('change', this.update, this);
		},
		render: function(){
			if(this.model.get('unlocked')) {
				this.$el.html(this.template(this.model.toJSON()));
			} else {
				this.$el.remove();
			}
			return this;
		},
		update: function(){
			this.render();
			this.model.save();
		}
	});
	return ResearchItemView;
});