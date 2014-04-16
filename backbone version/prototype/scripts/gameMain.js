require(['requireConfig'], function(){
	require(['jQuery', 'GameView'], function($, GameView){
		$(function(){
			var game = new GameView();
		});
	});
});