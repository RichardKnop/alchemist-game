/*global define*/
define([], function () {

	"use strict";

	return function () {

		var that = this, grid;

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
			var maximumX,
				maximumY,
				shuffleComplexity,
				random;

			console.log("Creating a new shuffle puzzle");

			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");
			this.shfl = this.serviceManager.getService("GridShuffler");

			maximumX = this.game.getMaximumX();
			maximumY = this.game.getMaximumY();
			shuffleComplexity = this.game.getShuffleComplexity();

			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			random = this.gen.generateCoordinate();

			this.shfl.setMaximumX(maximumX);
			this.shfl.setMaximumY(maximumY);
			this.shfl.init();
			this.shfl.setEmptySpace(random.x, random.y);
			this.shfl.shuffle(shuffleComplexity);

			grid = this.shfl.getGrid();

			return this;
		};

		this.getHTML = function () {
			var boxWidth = 464,
				ingredientsPerRow = 5,
				ingredientMargin = 5,
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
				html;

			boxStyle = 'style="';
			boxStyle += 'width:' + boxWidth + 'px;';
			boxStyle += 'height:' + boxHeight + 'px;"';
			boxStyle += '"';
			html = '<div id="shuffle-puzzle" class="container">';
			html += '<h1>Shuffle Puzzle</h1>';
			html += '<div class="box pull-left" ' + boxStyle + '>';

			left = ingredientMargin * 2 + remainder / 2;
			top = ingredientMargin * 2 + remainder / 2;
			for (i = 1; i <= ingredientsPerRow * ingredientsPerRow - 1; i += 1) {
				ingredientStyle = 'style="';
				ingredientStyle += 'width:' + ingredientWidth + 'px;';
				ingredientStyle += 'height:' + ingredientHeight + 'px;';
				ingredientStyle += 'left:' + left + 'px;';
				ingredientStyle += 'top:' + top + 'px;';
				ingredientStyle += 'line-height:' + ingredientHeight + 'px;';
				ingredientStyle += '"';
				html += '<div class="ingredient" ' + ingredientStyle + '>' + i + '</div>';
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
			for (i = 1; i <= ingredientsPerRow * ingredientsPerRow; i += 1) {
				ingredientStyle = 'style="';
				ingredientStyle += 'width:' + ingredientWidth + 'px;';
				ingredientStyle += 'height:' + ingredientHeight + 'px;';
				ingredientStyle += 'left:' + left + 'px;';
				ingredientStyle += 'top:' + top + 'px;';
				ingredientStyle += 'line-height:' + ingredientHeight + 'px;';
				ingredientStyle += '"';
				html += '<div class="ingredient" ' + ingredientStyle + '>' + i + '</div>';
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

	};

});