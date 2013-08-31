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
				formattedRemainingTime,
				itemStyle;

			level = this.serviceManager.getService("Game").getLevel();
			remainingTime = this.serviceManager.getService("Game").getRemainingTime();
			formattedRemainingTime = this.serviceManager.getService("Game").formatTime(remainingTime);
			score = this.serviceManager.getService("Game").getScore();
			html = '<div id="spot-the-difference-puzzle" class="container">';
			html += '<div id="level">LEVEL ' + level + '</div>';
			html += '<div id="time">' + formattedRemainingTime + '</div>';
			html += '<div id="score">SCORE: ' + score + '</div>';

			// left side
			for (i = 0; i < items.length; i += 1) {
				html += '<div class="to-be-moved item ' + items[i] + '"></div>';
			}

			// right side
			for (i = 0; i < items.length; i += 1) {
				html += '<div class="item ' + items[i] + '"></div>';
			}

			html += "</div>";
			return html;
		};

		this.afterRender = function () {
			var toBeMoved, i, el;
			toBeMoved = document.getElementsByClassName("to-be-moved");
			for (i = 0; i < toBeMoved.length; i += 1) {
				el = toBeMoved[i];
				el.style.visibility = "hidden";
				el.style.left = (el.offsetLeft - 481) + "px";
			}
			// randomize
			for (i = 0; i < toBeMoved.length; i += 1) {
				el = toBeMoved[i];
				el.style.visibility = "visible";
			}
		};

	};

});