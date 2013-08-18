define([], function() {

	"use strict";

	return function() {
		
		var that = this, grid, remainingTime;
		
		this.setServiceManager = function(m) {
			this.serviceManager = m;
		};
		
		this.init = function() {
			console.log("Creating a new shuffle puzzle");
			
			this.game = this.serviceManager.getService("Game");
			this.gen = this.serviceManager.getService("RandomGenerator");
			this.shfl = this.serviceManager.getService("GridShuffler");
			
			var maximumX = this.game.getMaximumX();
			var maximumY = this.game.getMaximumY();
			var shuffleComplexity = this.game.getShuffleComplexity();
			
			this.gen.setMaximumX(maximumX);
			this.gen.setMaximumY(maximumY);
			var random = this.gen.generate();
			
			this.shfl.setMaximumX(maximumX);
			this.shfl.setMaximumY(maximumY);
			this.shfl.init();
			this.shfl.setEmptySpace(random.x, random.y);
			this.shfl.shuffle(shuffleComplexity);
			
			grid = this.shfl.getGrid();
			remainingTime = this.game.getRemainingTime();
			
			return this;
		};
		
		this.getHTML = function() {
			return '<div id="shuffle-puzzle" class="container">\
						<h1>Shuffle Puzzle</h1>\
						<div class="box pull-left">\
							<div class="ingredient">1</div>\
							<div class="ingredient">2</div>\
							<div class="ingredient">3</div>\
							<div class="ingredient">4</div>\
							<div class="ingredient">5</div>\
							<div class="ingredient">6</div>\
							<div class="ingredient">7</div>\
							<div class="ingredient">8</div>\
							<div class="ingredient">9</div>\
							<div class="ingredient">10</div>\
							<div class="ingredient">11</div>\
							<div class="ingredient">12</div>\
							<div class="ingredient">13</div>\
							<div class="ingredient">14</div>\
							<div class="ingredient">15</div>\
							<div class="ingredient">16</div>\
							<div class="ingredient">17</div>\
							<div class="ingredient">18</div>\
							<div class="ingredient">19</div>\
							<div class="ingredient">20</div>\
							<div class="ingredient">21</div>\
							<div class="ingredient">22</div>\
							<div class="ingredient">23</div>\
							<div class="ingredient">24</div>\
						</div>\
						<div class="box pull-right">\
							<div class="ingredient">1</div>\
							<div class="ingredient">2</div>\
							<div class="ingredient">3</div>\
							<div class="ingredient">4</div>\
							<div class="ingredient">5</div>\
							<div class="ingredient">6</div>\
							<div class="ingredient">7</div>\
							<div class="ingredient">8</div>\
							<div class="ingredient">9</div>\
							<div class="ingredient">10</div>\
							<div class="ingredient">11</div>\
							<div class="ingredient">12</div>\
							<div class="ingredient">13</div>\
							<div class="ingredient">14</div>\
							<div class="ingredient">15</div>\
							<div class="ingredient">16</div>\
							<div class="ingredient">17</div>\
							<div class="ingredient">18</div>\
							<div class="ingredient">19</div>\
							<div class="ingredient">20</div>\
							<div class="ingredient">21</div>\
							<div class="ingredient">22</div>\
							<div class="ingredient">23</div>\
							<div class="ingredient">24</div>\
							<div class="ingredient">25</div>\
						</div>\
					</div>';
		};
		
	};

});