/*global define*/
define(["core/Util"], function (Util) {

	"use strict";

	return function () {

		var that = this,
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

		function itemClick() {
			/*jslint browser:true */
			var newEl, bgImg;
			Util.removeClass(this, "different");
			Util.playSuccessSound();
			newEl = this.cloneNode(true);
			this.parentNode.replaceChild(newEl, this);
			newEl.className += " animated tada";
			bgImg = getStyle(newEl, 'background-image').replace("/items2/", "/items/");
			newEl.style.backgroundImage = bgImg;

			console.log(document.getElementsByClassName("different").length);
			if (0 === document.getElementsByClassName("different").length) {
				setTimeout(function () {
					that.serviceManager.getService("Game").nextPuzzle(true);
				}, 2000);
			}
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
			console.log("Creating a new spot the difference puzzle");

			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");

			this.gen.setMaximum(items.length);

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
			html += '<div id="intro-text" class="hidden">Spot the difference!</div>';
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
			var toBeMoved, all, i, el, bgImg, numberOfDifferences, randoms;

			all = document.getElementsByClassName("item");
			toBeMoved = document.getElementsByClassName("to-be-moved");

			// hide elements that will be moved to the left side
			for (i = 0; i < toBeMoved.length; i += 1) {
				el = toBeMoved[i];
				el.style.visibility = "hidden";
				el.style.left = (el.offsetLeft - 481) + "px";
			}

			numberOfDifferences = this.serviceManager.getService("Game").getDifferences();
			randoms = this.gen.generateIntegers(numberOfDifferences);
			for (i = 0; i < randoms.length; i += 1) {
				el = all[randoms[i] - 1];
				bgImg = getStyle(el, 'background-image').replace("/items/", "/items2/");
				el.style.backgroundImage = bgImg;
				el.className += " different";
				el.addEventListener("click", itemClick, false);
			}

			// make the left side visible
			for (i = 0; i < toBeMoved.length; i += 1) {
				el = toBeMoved[i];
				el.style.visibility = "visible";
			}

			// make all items flash twice with a CSS3 animation
			flashItems(function () {
				setTimeout(function () {
					var introText = document.getElementById("intro-text");
					Util.removeClass(introText, "hidden");
					introText.className += "animated fadeInDown";
					setTimeout(function () {
						introText.className += " fadeOutDown";
						setTimeout(function () {
							introText.parentNode.removeChild(introText);
							startCountingDown();
						}, 1000);
					}, 1000);
				}, 1000);
			});
		};

		this.destruct = function () {
			//TODO
		};

	};

});