/*global define*/
define([
	"core/ServiceManager",
	"core/Renderer",
	"core/CookieManager",
	"core/RandomGenerator",
	"core/GridShuffler",
	"core/Game"
], function (
	ServiceManager,
	Renderer,
	CookieManager,
	RandomGenerator,
	GridShuffler,
	Game
) {

	"use strict";

	return function () {

		var that = this, loadingInterval;

		function stopLoading(callback) {
			clearInterval(loadingInterval);
			if (callback) {
				callback();
			}
		}

		function startLoading(callback) {
			/*jslint browser:true */
			var innerIndicator = document.getElementById("inner-indicator"),
				progressText = document.getElementById("progress-text"),
				w = 0,
				max = 510.0,
				increment = 5.1;
			loadingInterval = setInterval(function () {
				w += increment;
				innerIndicator.style.width = Math.round(w) + "px";
				progressText.innerHTML = Math.floor(w / increment) + "%";
				if (w >= max) {
					stopLoading(callback);
				}
			}, 25);
			// TODO preload images etc
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.run = function () {

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

			startLoading(function() {
				game.startNew(true);
			});

		};

	};

});