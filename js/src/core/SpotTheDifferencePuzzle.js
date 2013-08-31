/*global define*/
define([], function () {

	"use strict";

	return function () {

		var that = this,
			random,
			items = [
				"jar",
				"symbol",
				"hawk-egg",
				"root",
				"hourglass",
				"herbs",
				"potion",
				"globe",
				"mineral-stone",
				"butterfly",
				"bird-skull",
				"amulet",
				"ogre-meat",
				"claw",
				"flower",
				"vampiric-urne",
				"blue-crystal",
				"mushroom",
				"knife",
				"bag"
			];

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
			console.log("Creating a new spot the difference puzzle");

			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");

			this.gen.setMaximum(10); // TODO

			random = this.gen.generateInteger();

			return this;
		};

		this.getHTML = function () {
			var html,
				i,
				level,
				score,
				remainingTime,
				formattedRemainingTime;

			level = this.serviceManager.getService("Game").getLevel();
			remainingTime = this.serviceManager.getService("Game").getRemainingTime();
			formattedRemainingTime = this.serviceManager.getService("Game").formatTime(remainingTime);
			score = this.serviceManager.getService("Game").getScore();
			html = '<div id="spot-the-difference-puzzle" class="container">';
			html += '<div id="level">LEVEL ' + level + '</div>';
			html += '<div id="time">' + formattedRemainingTime + '</div>';
			html += '<div id="score">SCORE: ' + score + '</div>';
			for (i = 0; i < items.length; i += 1) {
				html += '<div id="' + items[i] + '" class="item"></div>';
			}
			html += "</div>";
			return html;
		};

	};

});