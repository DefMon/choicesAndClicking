require(['requireConfig'], function(){
	require(['jQuery', 'Global', 'GameController'], 
	function($, G, GameController){
		$(function(){
			var game = new GameController();
		});	
	});
});