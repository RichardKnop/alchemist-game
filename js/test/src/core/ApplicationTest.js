define([
    'core/Application'
], function(Application) {

    return function() {
		
        this.runTests = function() {

            var application = new Application();

            test("Test Application.getScore/getLevel/getPuzzlesSolved", function() {
                
                application.newGame();
				strictEqual(0, application.getScore());
				strictEqual(1, application.getLevel());
				strictEqual(0, application.getPuzzlesSolved());

            });

        };
		
    };

});