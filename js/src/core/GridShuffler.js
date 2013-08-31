/*global define*/
define([], function () {

	"use strict";

	return function () {

		var maximumX, maximumY,
			grid, emptySpace, previousMovementTag, i;

		function logPointMovement(from, to) {
			console.log("[" + from.x + " ; " + from.y + "] => [" + to.x + " ; " + to.y + "]");
		}

		function getPointByCoordinates(x, y) {
			for (i = 0; i < grid.length; i += 1) {
				if (x === grid[i].x && y === grid[i].y) {
					return grid[i];
				}
			}
			throw "Point with coordinates [" + x + " ; " + y + "] not found";
		}

		function moveEmptySpaceLeft() {
			var point = getPointByCoordinates(
				emptySpace.x - 1,
				emptySpace.y
			);
			logPointMovement(emptySpace, point);
			point.x += 1;
			emptySpace.x -= 1;
			previousMovementTag = "left";
		}

		function moveEmptySpaceRight() {
			var point = getPointByCoordinates(
				emptySpace.x + 1,
				emptySpace.y
			);
			logPointMovement(emptySpace, point);
			point.x -= 1;
			emptySpace.x += 1;
			previousMovementTag = "right";
		}

		function moveEmptySpaceDown() {
			var point = getPointByCoordinates(
				emptySpace.x,
				emptySpace.y - 1
			);
			logPointMovement(emptySpace, point);
			point.y += 1;
			emptySpace.y -= 1;
			previousMovementTag = "down";
		}

		function moveEmptySpaceUp() {
			var point = getPointByCoordinates(
				emptySpace.x,
				emptySpace.y + 1
			);
			logPointMovement(emptySpace, point);
			point.y -= 1;
			emptySpace.y += 1;
			previousMovementTag = "up";
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

		function getPossibleEmptySpaceMovements() {
			var possibleMovements = [];

			if ("right" !== previousMovementTag && emptySpaceCanMoveLeft()) {
				possibleMovements.push(moveEmptySpaceLeft);
			}

			if ("left" !== previousMovementTag && emptySpaceCanMoveRight()) {
				possibleMovements.push(moveEmptySpaceRight);
			}

			if ("up" !== previousMovementTag && emptySpaceCanMoveDown()) {
				possibleMovements.push(moveEmptySpaceDown);
			}

			if ("down" !== previousMovementTag && emptySpaceCanMoveUp()) {
				possibleMovements.push(moveEmptySpaceUp);
			}

			return possibleMovements;
		}

		function getEmptySpaceMovement() {
			var movements = getPossibleEmptySpaceMovements();
			return movements[Math.floor(Math.random() * movements.length)];
		}

		function moveEmptySpace() {
			if (undefined === emptySpace) {
				throw "You have to call setEmptySpace first";
			}
			var movement = getEmptySpaceMovement();
			movement();
			console.log("new empty space = [" + emptySpace.x + " ; " + emptySpace.y + "]");
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.setMaximumX = function (x) {
			maximumX = x;
		};

		this.setMaximumY = function (y) {
			maximumY = y;
		};

		this.init = function () {
			grid = [];
			var x = 1, y = 1;
			for (i = 0; i < maximumX * maximumY; i += 1) {
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
		};

		this.getGrid = function () {
			return grid;
		};

		this.setEmptySpace = function (x, y) {
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

		this.getEmptySpace = function () {
			return emptySpace;
		};

		this.shuffle = function (n) {
			while (n > 0) {
				moveEmptySpace();
				n -= 1;
			}
		};

	};

});