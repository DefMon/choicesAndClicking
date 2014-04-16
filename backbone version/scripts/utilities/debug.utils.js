define(function(){
	var developmentMode = true;
	return {
		devMode: developmentMode,
		log: function(message) {
			if(developmentMode){
				console.log(message);
			}
		},
		break: function(){
			if(developmentMode){
				debugger;
			}
		}
	}
});
