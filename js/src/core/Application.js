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

		var that = this, loadingInterval,
			imagesToPreload = [
				"/images/2/background.png",
				"/images/2/items/jar.png",
				"/images/2/items/symbol.png",
				"/images/2/items/hawk-egg.png",
				"/images/2/items/root.png",
				"/images/2/items/hourglass.png",
				"/images/2/items/herbs.png",
				"/images/2/items/potion.png",
				"/images/2/items/globe.png",
				"/images/2/items/mineral-stone.png",
				"/images/2/items/butterfly.png",
				"/images/2/items/bird-skull.png",
				"/images/2/items/amulet.png",
				"/images/2/items/ogre-meat.png",
				"/images/2/items/claw.png",
				"/images/2/items/flower.png",
				"/images/2/items/vampiric-urne.png",
				"/images/2/items/blue-crystal.png",
				"/images/2/items/mushroom.png",
				"/images/2/items/knife.png",
				"/images/2/items/bag.png",
				"/images/2/items2/jar.png",
				"/images/2/items2/symbol.png",
				"/images/2/items2/hawk-egg.png",
				"/images/2/items2/root.png",
				"/images/2/items2/hourglass.png",
				"/images/2/items2/herbs.png",
				"/images/2/items2/potion.png",
				"/images/2/items2/globe.png",
				"/images/2/items2/mineral-stone.png",
				"/images/2/items2/butterfly.png",
				"/images/2/items2/bird-skull.png",
				"/images/2/items2/amulet.png",
				"/images/2/items2/ogre-meat.png",
				"/images/2/items2/claw.png",
				"/images/2/items2/flower.png",
				"/images/2/items2/vampiric-urne.png",
				"/images/2/items2/blue-crystal.png",
				"/images/2/items2/mushroom.png",
				"/images/2/items2/knife.png",
				"/images/2/items2/bag.png",
				"/images/3/background.png",
			];

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
				increment = 5.1,
				i,
				img;
			loadingInterval = setInterval(function () {
				w += increment;
				innerIndicator.style.width = Math.round(w) + "px";
				progressText.innerHTML = Math.floor(w / increment) + "%";
				if (w >= max) {
					stopLoading(callback);
				}
			}, 25);
			// preload images
			for (i = 0; i < imagesToPreload.length; i += 1) {
				img = new Image();
				img.src = imagesToPreload[i];
			}
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