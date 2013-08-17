define([], function() {

	"use strict";

	return function(maximumX, maximumY) {
		
		var grid = [], emptySpace, i;
		
		var x = 1, y = 1;
		for (i = 0; i < maximumX * maximumY; i++) {
			grid.push({
				originalX: x,
				originalY: y,
				x: x,
				y: y
			});
			
			if (x === maximumX) {
				x = 1;
				y += 1;
			} else {
				x += 1;
			}
		}
		
		this.getGrid = function() {
			return grid;
		};
		
		this.setEmptySpace = function(x, y) {
			if (x < 1 || x > maximumX) {
				throw "Invalid x coordinate";
			}
			if (y < 1 || y > maximumY) {
				throw "Invalid y coordinate";
			}
			emptySpace = {
				originalX: x,
				originalY: y,
				x: x,
				y: y
			};
			
			console.log("initial empty space = [" + emptySpace.x + " ; " + emptySpace.y + "]");
		};
		
		this.getEmptySpace = function() {
			return emptySpace;
		};
		
		this.shuffle = function(n) {
			while (n > 0) {
				moveEmptySpace();
				n -= 1;
			}
		};
		
		function moveEmptySpace() {
			if (undefined === emptySpace) {
				throw "You have to call setEmptySpace first";
			}
			var movement = getEmptySpaceMovement();
			movement();
			console.log("new empty space = [" + emptySpace.x + " ; " + emptySpace.y + "]");
		};
		
		function getPointByCoordinates(x, y) {
			for (i = 0; i < grid.length; i++) {
				if (x === grid[i].x && y === grid[i].y) {
					return grid[i];
				}
			}
			throw "Point with coordinates [" + x + " ; " + y + "] not found";
		}
		
		function getEmptySpaceMovement() {
			var movements = getPossibleEmptySpaceMovements();
			return movements[Math.floor(Math.random() * movements.length)];
		}
		
		function getPossibleEmptySpaceMovements() {
			var possibleMovements = [];
			
			if (emptySpaceCanMoveLeft()) {
				possibleMovements.push(moveEmptySpaceLeft);
			}
			
			if (emptySpaceCanMoveRight()) {
				possibleMovements.push(moveEmptySpaceRight);
			}
			
			if (emptySpaceCanMoveDown()) {
				possibleMovements.push(moveEmptySpaceDown);
			}
			
			if (emptySpaceCanMoveUp()) {
				possibleMovements.push(moveEmptySpaceUp);
			}
			
			return possibleMovements;
		}
		
		function emptySpaceCanMoveLeft() {
			return emptySpace.x > 1;
		}
		
		function emptySpaceCanMoveRight() {
			return emptySpace.x < maximumX;
		}
		
		function emptySpaceCanMoveDown() {
			return emptySpace.y > 1;
		}
		
		function emptySpaceCanMoveUp() {
			return emptySpace.y < maximumY;
		}
		
		var moveEmptySpaceLeft = function() {
			var point = getPointByCoordinates(
				emptySpace.x - 1,
				emptySpace.y
				);
			logPointMovement(emptySpace, point);
			point.x += 1;
			emptySpace.x -= 1;
		};
		
		var moveEmptySpaceRight = function() {
			var point = getPointByCoordinates(
				emptySpace.x + 1,
				emptySpace.y
			);
			logPointMovement(emptySpace, point);
			point.x -= 1;
			emptySpace.x += 1;
		};
		
		var moveEmptySpaceDown = function() {
			var point = getPointByCoordinates(
				emptySpace.x,
				emptySpace.y - 1
				);
			logPointMovement(emptySpace, point);
			point.y += 1;
			emptySpace.y -= 1;
		};
		
		var moveEmptySpaceUp = function() {
			var point = getPointByCoordinates(
				emptySpace.x,
				emptySpace.y + 1
				);
			logPointMovement(emptySpace, point);
			point.y -= 1;
			emptySpace.y += 1;
		};
		
		function logPointMovement(from, to) {
			console.log("[" + from.x + " ; " + from.y + "] => [" + to.x + " ; " + to.y + "]");
		}
		
	};

});