define(['Global', 'Utils', 'ActionsCollection', 'ActionView'],
function(G, Utils, ActionsCollection, ActionView){
	return Backbone.View.extend({
		initialize: function(element, defaultActions){
			this.collection = Utils.storage.loadOrCreateBackboneCollection(ActionsCollection, defaultActions);
			this.setElement(element);
			this.render();
			Utils.debug.log('Actions initialized');
		},
		render: function(){
			_.each(this.collection.where({unlocked: true}), function(action){
				this.renderAction(action);	
			}, this);
			return this;
		},
		renderAction: function(action){
			var actionView = new ActionView({model: action});
			this.$el.append(actionView.render().el);
			return this;
		}	
	});	
});