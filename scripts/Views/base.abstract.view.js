define(['Global'], function(G){
	return Backbone.View.extend({
		initialize: function(){
			this.model.on('change', this.update, this);
		},
		update: function(){
			this.model.save();
			this.render();
			console.log(this.model.get('name')+' updated');
		},
		render: function(){
			if(this.model.get('unlocked')) {
				this.$el.html(this.template(this.model.toJSON()));
			} else {
				this.remove();
				this.$el.remove();
			}
			return this;
		}
	});
});