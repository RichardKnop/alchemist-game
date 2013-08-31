/*global define, test, strictEqual, ok*/
define([
	"core/GridShuffler"
], function (GridShuffler) {

	"use strict";

	return function () {

		var shuffler = new GridShuffler(), emptySpace;
		shuffler.setMaximumX(3);
		shuffler.setMaximumY(3);
		shuffler.init();

		this.runTests = function () {

			test("Test GridShuffler.shuffle", function () {
				shuffler.setEmptySpace(3, 1);
				shuffler.shuffle(1);
				emptySpace = shuffler.getEmptySpace();

				strictEqual(emptySpace.originalX, 3);
				strictEqual(emptySpace.originalY, 1);

				if (2 === emptySpace.x) { // if we have moved left

					strictEqual(emptySpace.y, 1);

					// we should now move left or up, not right back to ([3 ; 1])
					shuffler.shuffle(1);
					emptySpace = shuffler.getEmptySpace();
					ok(3 !== emptySpace.x);
					if (1 === emptySpace.x) { // if we have moved left

						strictEqual(emptySpace.y, 1);

						// we can only move up now ([1 ; 2])
						shuffler.shuffle(1);
						emptySpace = shuffler.getEmptySpace();
						strictEqual(emptySpace.x, 1);
						strictEqual(emptySpace.y, 2);

					} else if (2 === emptySpace.x) { // if we have moved up

						strictEqual(emptySpace.y, 2);

						// we cannot move down as that's were we came from
						shuffler.shuffle(1);
						emptySpace = shuffler.getEmptySpace();
						ok(1 !== emptySpace.y);

					}

				} else if (3 === emptySpace.x) { // if we have moved up

					strictEqual(emptySpace.y, 2);

					// we should now move left or up, not down (back to [3 ; 1])
					shuffler.shuffle(1);
					emptySpace = shuffler.getEmptySpace();
					ok(1 !== emptySpace.y);
					if (2 === emptySpace.x) { // if we have moved left

						strictEqual(emptySpace.y, 2);

						// we cannot move right as that's where we came from
						ok(3 !== emptySpace.x);

					} else if (3 === emptySpace.x) { // if we have moved up

						strictEqual(emptySpace.y, 3);

						// we can only move left now ([2 ; 3])
						shuffler.shuffle(1);
						emptySpace = shuffler.getEmptySpace();
						strictEqual(emptySpace.x, 2);
						strictEqual(emptySpace.y, 3);

					}

				}
            });

		};

	};

});