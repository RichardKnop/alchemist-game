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

		function getStyle(x, styleProp) {
			/*jslint browser:true */
			var y;
			if (x.currentStyle) {
				y = x.currentStyle[styleProp];
			} else if (window.getComputedStyle) {
				y = document.defaultView.getComputedStyle(x, null).getPropertyValue(styleProp);
			}
			return y;
		}

		function flashItems(callback) {
			/*jslint browser:true */
			var items = document.getElementsByClassName("item"), el, i;
			setTimeout(function () {
				for (i = 0; i < items.length; i += 1) {
					el = items[i];
					el.className += " animated flash";
				}
				if (callback) {
					callback();
				}
			}, 250);
		}

		function playSuccessSound() {
			/*jslint browser:true */
			var successSound = document.getElementById("success-sound");
			successSound.currentTime = 0;
			successSound.play();
		}

		function itemClick() {
			playSuccessSound();
			var newEl = this.cloneNode(true);
			this.parentNode.replaceChild(newEl, this);
			newEl.className += " animated tada";
			setTimeout(function () {
				that.serviceManager.getService("Game").nextPuzzle(true);
			}, 2000);
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
			console.log("Creating a new spot the difference puzzle");

			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");

			this.gen.setMaximum(items.length);

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

		this.afterRender = function (startCountingDown) {
			/*jslint browser:true */
			var toBeMoved, all, i, el, bgImg;

			all = document.getElementsByClassName("item");
			toBeMoved = document.getElementsByClassName("to-be-moved");

			// hide elements that will be moved to the left side
			for (i = 0; i < toBeMoved.length; i += 1) {
				el = toBeMoved[i];
				el.style.visibility = "hidden";
				el.style.left = (el.offsetLeft - 481) + "px";
			}

			// randomize
			// TODO based on level
			// TODO - add event listeners
			el = all[random - 1];
			bgImg = getStyle(el, 'background-image').replace("/items/", "/items2/");
			el.style.backgroundImage = bgImg;
			el.addEventListener("click", itemClick, false);

			// make the left side visible
			for (i = 0; i < toBeMoved.length; i += 1) {
				el = toBeMoved[i];
				el.style.visibility = "visible";
			}

			// make all items flash twice with a CSS3 animation
			flashItems(startCountingDown);
		};

		this.destruct = function () {
			//TODO
		};

	};

});