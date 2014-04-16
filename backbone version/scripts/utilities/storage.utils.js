define(function(){
	return {
		saveBackboneModel: function(location, model){
			localStorage[location] = model.attributes;
		},
		loadOrCreateBackboneModel: function(location, Model, defaultAttributes){
			var modelAttributes = localStorage[location];
			if(typeof modelAttributes === 'undefined') {
				if(defaultAttributes) {
					modelAttributes = defaultAttributes;
					this.saveItem(location, modelAttributes);
				}
			}
			return new Model(modelAttributes);
		},
		loadOrCreateBackboneCollection: function(Collection, defaultObjects) {
			var collection = new Collection();
			collection.fetch();
			if(collection.length === 0) {
				collection = new Collection(defaultObjects);
				collection.each(function(collectionObject){
					collectionObject.save();
				});
			}
			return collection;
		},
		saveItem: function(location, item){
			localStorage[location] = item;
		},
		loadItem: function(location){
			return localStorage[location];
		},
		clear: function(){
			localStorage.clear();
		}
	}
});
