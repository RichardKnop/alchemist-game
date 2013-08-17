define([
	"core/GridShuffler"
], function(GridShuffler) {

	"use strict";

	return function() {
		
		var shuffler = new GridShuffler(2, 2), emptySpace;
		
		this.runTests = function() {
			
			test("Test GridShuffler.shuffle", function() {
				shuffler.setEmptySpace(2, 1);
				shuffler.shuffle(1);
				emptySpace = shuffler.getEmptySpace();
				
				strictEqual(emptySpace.originalX, 2);
				strictEqual(emptySpace.originalY, 1);
				
				if (1 === emptySpace.x) { // if we have moved left
					strictEqual(emptySpace.y, 1);
					
					shuffler.shuffle(1);
					emptySpace = shuffler.getEmptySpace();
					
					if (2 === emptySpace.x) { // if we have moved right
						strictEqual(emptySpace.y, 1);
					} else if (1 === emptySpace.x) { // if we have moved up
						strictEqual(emptySpace.y, 2);
					}
				} else if (2 === emptySpace.x) { // if we have moved up
					strictEqual(emptySpace.y, 2);
					
					shuffler.shuffle(1);
					emptySpace = shuffler.getEmptySpace();
					
					if (1 === emptySpace.x) { // if we have moved left
						strictEqual(emptySpace.y, 2);
					} else if (2 === emptySpace.x) { // if we have moved down
						strictEqual(emptySpace.y, 1);
					}
				}
            });
			
		};
		
	};

});