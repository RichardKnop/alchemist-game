/*global define*/
define([], function () {

	"use strict";

	return function () {

		var maximumX, maximumY, shuffleComplexity, 
			grid, emptySpace, previousMovementTag, i,
			itemMargin;

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

		function animation(el, isHorizontal, from, to, callback) {
			var start = true === isHorizontal ? from.x : from.y,
				stop = true === isHorizontal ? to.x : to.y,
				intervalId, diff;
			intervalId = setInterval(function () {
				diff = Math.abs(stop - start);
				if (stop < start) {
					if (diff < 4) {
						start -= diff;
					} else {
						start -= 4;
					}
				} else {
					if (diff < 4) {
						start += diff;
					} else {
						start += 4;
					}
				}
				if (true === isHorizontal) {
					el.style.left = start + 'px';
				} else {
					el.style.top = start + 'px';
				}
				if (start === stop) {
					clearInterval(intervalId);
					if (callback) {
						callback();
					}
				}
			}, 1);
		}

		function moveEmptySpace(animate) {
			/*jslint browser:true */
			var itemToAnimateId,
				itemToAnimate,
				isHorizontal,
				callback,
				animateFrom,
				animateTo,
				newAnimatedItemId;
			if (true === animate) {
				if (null === itemMargin) {
					itemMargin = document.getElementById("item-2-1").offsetLeft 
								- document.getElementById("item-1-1").offsetLeft 
								- document.getElementById("item-2-1").offsetWidth;
				}
				newAnimatedItemId = "item-" + emptySpace.x + "-" + emptySpace.y;
			}

			shuffleComplexity -= 1;
			if (undefined === emptySpace) {
				throw "You have to call setEmptySpace first";
			}
			var movement = getEmptySpaceMovement();
			movement();

			// animate
			if (true === animate) {
				itemToAnimateId = "item-" + emptySpace.x + "-" + emptySpace.y ;
				itemToAnimate = document.getElementById(itemToAnimateId);
				isHorizontal = "left" === previousMovementTag || "right" === previousMovementTag;
				animateFrom = {
					x: itemToAnimate.offsetLeft,
					y: itemToAnimate.offsetTop
				};
				if ("left" === previousMovementTag) {
					animateTo = {
						x: animateFrom.x + itemToAnimate.offsetWidth + itemMargin,
						y: animateFrom.y
					};
				}
				if ("right" === previousMovementTag) {
					animateTo = {
						x: animateFrom.x - itemToAnimate.offsetWidth - itemMargin,
						y: animateFrom.y
					};
				}
				if ("up" === previousMovementTag) {
					animateTo = {
						x: animateFrom.x,
						y: animateFrom.y + itemToAnimate.offsetHeight + itemMargin
					};
				}
				if ("down" === previousMovementTag) {
					animateTo = {
						x: animateFrom.x,
						y: animateFrom.y - itemToAnimate.offsetHeight - itemMargin
					};
				}
				callback = function () {
					itemToAnimate.id = newAnimatedItemId;
					if (shuffleComplexity > 0) {
						//TODO - fix in safari
						moveEmptySpace(animate);
					}
				};
				animation(itemToAnimate, isHorizontal, animateFrom, animateTo, callback);
			} else {
				if (shuffleComplexity > 0) {
					moveEmptySpace(animate);
				}
			}

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

		this.shuffle = function (n, animate) {
			itemMargin = null;
			shuffleComplexity = n;
			moveEmptySpace(animate);
		};

	};

});