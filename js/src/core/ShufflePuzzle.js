/*global define*/
define([], function () {

	"use strict";

	return function () {

		var that = this,
			grid,
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
				"bag",
				"key",
				"books",
				"ring",
				"scroll"
			],
			chosenItems,
			i;

		function generateId(pos, len) {
			var side = Math.sqrt(len + 1),
				y = (3 - Math.floor((pos - 1) / side)),
				x = 0 === pos % side ? side : pos % side;
			return "item-" + x + "-" + y;
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
			var maximumX,
				maximumY;

			console.log("Creating a new shuffle puzzle");

			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");
			this.shfl = this.serviceManager.getService("GridShuffler");

			maximumX = this.game.getMaximumX();
			maximumY = this.game.getMaximumY();

			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);

			this.shfl.setMaximumX(maximumX);
			this.shfl.setMaximumY(maximumY);
			this.shfl.init();
			this.shfl.setEmptySpace(maximumX, 1);
			
			chosenItems = [];
			items = this.gen.shuffleArray(items);
			for (i = 0; i < maximumX * maximumY - 1; i += 1) {
				chosenItems.push(items[i]);
			}

			return this;
		};

		this.getHTML = function () {
			var boxWidth = 332,
				ingredientsPerRow = this.game.getMaximumX(),
				ingredientMargin = 4,
				usefulBoxWidth = boxWidth - (ingredientsPerRow * 2 + 2) * ingredientMargin,
				ingredientWidth = Math.floor(usefulBoxWidth / ingredientsPerRow),
				boxHeight = boxWidth,
				ingredientHeight = ingredientWidth,
				remainder = usefulBoxWidth - ingredientWidth * ingredientsPerRow,
				i,
				ingredientStyle,
				left,
				top,
				boxStyle,
				html,
				level,
				score,
				remainingTime,
				formattedRemainingTime;

			level = this.serviceManager.getService("Game").getLevel();
			remainingTime = this.serviceManager.getService("Game").getRemainingTime();
			formattedRemainingTime = this.serviceManager.getService("Game").formatTime(remainingTime);
			score = this.serviceManager.getService("Game").getScore();

			boxStyle = 'style="';
			boxStyle += 'width:' + boxWidth + 'px;';
			boxStyle += 'height:' + boxHeight + 'px;"';
			boxStyle += '"';
			html = '<div id="shuffle-puzzle" class="container">';
			html += '<div id="level">LEVEL ' + level + '</div>';
			html += '<div id="time">' + formattedRemainingTime + '</div>';
			html += '<div id="score">SCORE: ' + score + '</div>';
			html += '<div class="box pull-left" ' + boxStyle + '>';

			left = ingredientMargin * 2 + remainder / 2;
			top = ingredientMargin * 2 + remainder / 2;
			for (i = 1; i <= chosenItems.length; i += 1) {
				ingredientStyle = 'style="';
				ingredientStyle += 'width:' + ingredientWidth + 'px;';
				ingredientStyle += 'height:' + ingredientHeight + 'px;';
				ingredientStyle += 'left:' + left + 'px;';
				ingredientStyle += 'top:' + top + 'px;';
				ingredientStyle += '"';
				html += '<div id="' + generateId(i, chosenItems.length) + '" class="item ' + chosenItems[i - 1] + '" ' + ingredientStyle + '></div>';
				if (0 === i % ingredientsPerRow) {
					left = ingredientMargin * 2 + remainder / 2;
					top += ingredientHeight + ingredientMargin * 2;
				} else {
					left += ingredientWidth + ingredientMargin * 2;
				}
			}

			html += '</div>';
			html += '<div class="box pull-right" ' + boxStyle + '>';

			left = ingredientMargin * 2 + remainder / 2;
			top = ingredientMargin * 2 + remainder / 2;
			for (i = 1; i <= chosenItems.length; i += 1) {
				ingredientStyle = 'style="';
				ingredientStyle += 'width:' + ingredientWidth + 'px;';
				ingredientStyle += 'height:' + ingredientHeight + 'px;';
				ingredientStyle += 'left:' + left + 'px;';
				ingredientStyle += 'top:' + top + 'px;';
				ingredientStyle += '"';
				html += '<div class="item ' + chosenItems[i - 1] + '" ' + ingredientStyle + '></div>';
				if (0 === i % ingredientsPerRow) {
					left = ingredientMargin * 2 + remainder / 2;
					top += ingredientHeight + ingredientMargin * 2;
				} else {
					left += ingredientWidth + ingredientMargin * 2;
				}
			}

			html += '</div>';
			html += '</div>';
			return html;
		};

		this.afterRender = function () {
			var shuffleComplexity = this.game.getShuffleComplexity();
			setTimeout(function () {
				that.shfl.shuffle(shuffleComplexity, true);
			}, 250);
			//grid = this.shfl.getGrid();
		};

	};

});