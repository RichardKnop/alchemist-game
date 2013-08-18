define([
	"core/ServiceManager",
	"core/Renderer",
	"core/CookieManager",
	"core/RandomGenerator",
	"core/GridShuffler",
	"core/Game"
], function(
	ServiceManager,
	Renderer,
	CookieManager,
	RandomGenerator,
	GridShuffler,
	Game
) {

	"use strict";

	return function() {
		
		var that = this;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.run = function() {
			
			this.setServiceManager(new ServiceManager());
			this.serviceManager.setService("Application", that);
			
			this.serviceManager.setService(
				"RandomGenerator",
				new RandomGenerator()
			);
			this.serviceManager.setService(
				"GridShuffler",
				new GridShuffler()
			);
			this.serviceManager.setService(
				"Renderer",
				new Renderer()
			);
			this.serviceManager.setService(
				"CookieManager",
				new CookieManager()
			);
			var game = new Game();
			this.serviceManager.setService(
				"Game",
				game
			);
			game.init();
			
			setTimeout(function() {
				game.startNew(true);
			}, 1500);
			
		};
		
	};

});