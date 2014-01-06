define(['Global', 'text!templates/building.template.html'], function(G, Template){
	var BuildingItemView = Backbone.View.extend({
		tagName: 'li',
		className: 'building',
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
	return BuildingItemView;
});