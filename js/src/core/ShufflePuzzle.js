/*global define*/
define(["core/Util"], function (Util) {

	"use strict";

	return function () {

		var that = this,
			maximumX,
			maximumY,
			itemMargin = 4,
			animationSpeed = 8,
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
				y = (maximumX - Math.floor((pos - 1) / side)),
				x = 0 === pos % side ? side : pos % side;
			return "item-" + x + "-" + y;
		}
		
		function isNextMoveHorizontal(emptySpace, x, y) {
			if (emptySpace.x === x + 1 && emptySpace.y === y) {
				// right
				return true;
			} else if (emptySpace.x === x - 1 && emptySpace.y === y) {
				// left
				return true;
			} else if (emptySpace.x === x && emptySpace.y === y + 1) {
				// up
				return false;
			} else if (emptySpace.x === x && emptySpace.y === y - 1) {
				// down
				return false;
			}
			throw "Could not determina if the move is horizontal";
		}

		function getMoveCoordinate(item, emptySpace, x, y) {
			if (emptySpace.x === x + 1 && emptySpace.y === y) {
				// right
				return {
					x: item.offsetLeft + item.offsetWidth + 2 * itemMargin,
					y: item.offsetTop
				};
			} else if (emptySpace.x === x - 1 && emptySpace.y === y) {
				// left
				return {
					x: item.offsetLeft - item.offsetWidth - 2 * itemMargin,
					y: item.offsetTop
				};
			} else if (emptySpace.x === x && emptySpace.y === y + 1) {
				// up
				return {
					x: item.offsetLeft,
					y: item.offsetTop - item.offsetWidth - 2 * itemMargin
				};
			} else if (emptySpace.x === x && emptySpace.y === y - 1) {
				// down
				return {
					x: item.offsetLeft,
					y: item.offsetTop + + item.offsetWidth + 2 * itemMargin
				};
			}
			throw "Could not calculate move coordinate";
		}

		function extractItemClass(el) {
			var splitClass = el.className.split(" "), i;
			for (i = 0; i < splitClass.length; i += 1) {
				if (-1 !== items.indexOf(splitClass[i])) {
					return splitClass[i];
				}
			}
			throw "Could not extract item class";
		}

		function checkIfPuzzleIsSolved() {
			/*jslint browser:true */
			var leftItems, i, el;
			leftItems = document.getElementsByClassName("movable");
			for (i = 0; i < leftItems.length; i += 1) {
				if ("item-" + maximumX + "-1" === leftItems[i].id) {
					return false;
				}
				el = document.getElementById(leftItems[i].id.replace("item", "item2"));
				if (extractItemClass(leftItems[i]) !== extractItemClass(el)) {
					return false;
				}
			}
			return true;
		}

		function itemClick() {
			var isHorizontal, from, to, callback,
				emptySpace, splitId, x, y, item = this;

			if (true === Util.isDisplayingTextMessage) {
				return;
			}

			if (false === that.shfl.canAnimate()) {
				return;
			}

			Util.playSlideSound();

			emptySpace = that.shfl.getEmptySpace();
			splitId = this.id.split("-");
			x = parseInt(splitId[1], 10);
			y = parseInt(splitId[2], 10);
			from = {
				x: item.offsetLeft,
				y: item.offsetTop
			};

			try {
				to = getMoveCoordinate(item, emptySpace, x, y);
				isHorizontal = isNextMoveHorizontal(emptySpace, x, y);

				callback = function () {
					item.id = "item-" + emptySpace.x + "-" + emptySpace.y;
					that.shfl.setEmptySpace(x, y);
					if (checkIfPuzzleIsSolved()) {
						Util.displayTextMessage(
							"Good job!",
							function () {
								that.serviceManager.getService("Game").nextPuzzle(true);
							}
						);
					}
				};
				that.shfl.animateItem(
					item,
					isHorizontal,
					from,
					to,
					that.getAnimationSpeed(),
					callback
				);
			} catch (e) {
				console.log(e);
			}
		}

		this.setServiceManager = function (m) {
			this.serviceManager = m;
		};

		this.init = function () {
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

		this.getItemMargin = function () {
			return itemMargin;
		}
		
		this.getAnimationSpeed = function () {
			return animationSpeed;
		}

		this.getHTML = function () {
			var boxWidth = 332,
				ingredientsPerRow = this.game.getMaximumX(),
				usefulBoxWidth = boxWidth - (ingredientsPerRow * 2 + 2) * itemMargin,
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

			left = itemMargin * 2 + remainder / 2;
			top = itemMargin * 2 + remainder / 2;
			for (i = 1; i <= chosenItems.length; i += 1) {
				ingredientStyle = 'style="';
				ingredientStyle += 'width:' + ingredientWidth + 'px;';
				ingredientStyle += 'height:' + ingredientHeight + 'px;';
				ingredientStyle += 'left:' + left + 'px;';
				ingredientStyle += 'top:' + top + 'px;';
				ingredientStyle += '"';
				html += '<div id="' + generateId(i, chosenItems.length) + '" class="item movable ' + chosenItems[i - 1] + '" ' + ingredientStyle + '></div>';
				if (0 === i % ingredientsPerRow) {
					left = itemMargin * 2 + remainder / 2;
					top += ingredientHeight + itemMargin * 2;
				} else {
					left += ingredientWidth + itemMargin * 2;
				}
			}

			html += '</div>';
			html += '<div class="box pull-right" ' + boxStyle + '>';

			left = itemMargin * 2 + remainder / 2;
			top = itemMargin * 2 + remainder / 2;
			for (i = 1; i <= chosenItems.length; i += 1) {
				ingredientStyle = 'style="';
				ingredientStyle += 'width:' + ingredientWidth + 'px;';
				ingredientStyle += 'height:' + ingredientHeight + 'px;';
				ingredientStyle += 'left:' + left + 'px;';
				ingredientStyle += 'top:' + top + 'px;';
				ingredientStyle += '"';
				html += '<div id="' + generateId(i, chosenItems.length).replace("item", "item2") + '" class="item non-movable ' + chosenItems[i - 1] + '" ' + ingredientStyle + '></div>';
				if (0 === i % ingredientsPerRow) {
					left = itemMargin * 2 + remainder / 2;
					top += ingredientHeight + itemMargin * 2;
				} else {
					left += ingredientWidth + itemMargin * 2;
				}
			}

			html += '</div>';
			html += '</div>';
			return html;
		};

		this.afterRender = function (startCountingDown) {
			/*jslint browser:true */
			var items, i, shuffleComplexity = this.game.getShuffleComplexity();

			setTimeout(function () {
				that.shfl.shuffle(shuffleComplexity, true, function () {
					Util.displayTextMessage(
						"Rearrange tiles correctly!",
						function () {
							items = document.getElementsByClassName("movable");
							for (i = 0; i < items.length; i += 1) {
								items[i].addEventListener("click", itemClick, false);
							}
							startCountingDown();
						}
						
					);
				});
			}, 1000);
		};
		
		this.destruct = function () {
			//TODO
		};

	};

});