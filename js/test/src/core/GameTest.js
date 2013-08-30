define([
    'core/Game'
], function(Game) {

    return function() {
		
        this.runTests = function() {

            var game = new Game();

            test("Test Game.getScore/getLevel/getPuzzlesSolved", function() {
                
                game.startNew();
				strictEqual(game.getScore(), 0);
				strictEqual(game.getLevel(), 1);
				strictEqual(game.getPuzzlesSolved(), 0);

            });
			
            test("Test Game.getRemainingTime", function() {

                game.setBaseTime(45);
				strictEqual(game.getRemainingTime(), "00:45");
				
                game.setBaseTime(90);
				strictEqual(game.getRemainingTime(), "01:30");

                game.setBaseTime(120);
				strictEqual(game.getRemainingTime(), "02:00");

            });

        };
		
    };

});