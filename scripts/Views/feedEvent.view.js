define(['Global'], function(G){
	return Backbone.View.extend({
		tagName: 'li',
		className: 'feedEvent',
		template: _.template('<p class="<%=type%>"><%=text%></p>'),
		render: function(){
			this.$el.html(this.template(this.model.toJSON()));
			return this;
		}
	});
});