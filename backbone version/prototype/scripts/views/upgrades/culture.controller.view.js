define(['Global', 'CultureCollection', 'UpgradeView', 'Utilities'],
function(G, CultureCollection, UpgradeView, Utils){
	return Backbone.View.extend({
		subscriptions: {
			'unlock:culture' : 'acquireCulture',
			'destroy:culture' : 'loseCulture'
		},
		initialize: function(element, culture){
			this.setElement(element);
			this.collection = new CultureCollection(culture);
			this.collection.fetch({remove: false});
			this.render();
		},
		render: function(){
			this.collection.each(function(item){
				item.save();
				if(item.get('unlocked')) {
					this.renderItem(item);
				}
			}, this);

			return this;
		},
		renderItem: function(item){
			var view = new UpgradeView({model: item});
			this.$el.find('ul').append(view.render().el);
			return this;
		},
		unlock: function(culture) {
			if(!culture.get('unlocked')){
				culture.set('unlocked', true);
				culture.get('onbuild')();
				culture.save();
				this.renderItem(culture);
			}
			return this;
		},
		lock: function(culture) {
			if(culture.get('unlocked')){
				culture.set('unlocked', false);
				culture.get('onbuild')(true);
				culture.save();
				this.renderItem(culture);
			}
			return this;
		},
		acquireCulture: function(cultureName) {
			var culture = this.collection.findWhere({name: cultureName});
			this.unlock(culture);
		},
		loseCulture: function(cultureName) {
			var culture = this.collection.findWhere({name: cultureName});
			this.lock(culture);
		}
	});
});