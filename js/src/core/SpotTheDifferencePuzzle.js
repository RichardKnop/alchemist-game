define([], function() {

	"use strict";

	return function() {
		
		var that = this, random, remainingTime;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
			console.log("Creating a new spot the difference puzzle");
			
			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");
			
			var maximumX = this.game.getMaximumX();
			var maximumY = this.game.getMaximumY();
			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			
			random = this.gen.generate();
			remainingTime = this.game.getRemainingTime();
			
			return this;
		};
		
		this.getHTML = function() {
			var boxWidth = 464;
			var ingredientsPerRow = 5, ingredientMargin = 5;
			var usefulBoxWidth = boxWidth;
			usefulBoxWidth -= (ingredientsPerRow * 2 + 2) * ingredientMargin;
			var ingredientWidth = Math.floor(usefulBoxWidth / ingredientsPerRow);
			var boxHeight = boxWidth, ingredientHeight = ingredientWidth;
			var remainder = usefulBoxWidth - ingredientWidth * ingredientsPerRow;
			
			var i, ingredientStyle, left, top;
			var boxStyle = 'style="';
			boxStyle += 'width:' + boxWidth + 'px;';
			boxStyle += 'height:' + boxHeight + 'px;"';
			boxStyle += '"';
			var html = '<div id="spot-the-difference-puzzle" class="container">';
			html += '<h1>Spot The Difference Puzzle</h1>';
			html += '<div class="box pull-left" ' + boxStyle + '>';

			left = ingredientMargin * 2 + remainder / 2;
			top = ingredientMargin * 2 + remainder / 2;
			for (i = 1; i <= ingredientsPerRow * ingredientsPerRow; i++) {
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
			for (i = 1; i <= ingredientsPerRow * ingredientsPerRow; i++) {
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