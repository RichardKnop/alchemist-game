define([
    'core/Game'
], function(Game) {

    return function() {
		
        this.runTests = function() {

            var game = new Game();

            test("Test Game.getScore/getLevel/getPuzzlesSolved", function() {
                
                game.startNew();
				strictEqual(0, game.getScore());
				strictEqual(1, game.getLevel());
				strictEqual(0, game.getPuzzlesSolved());

            });

        };
		
    };

});