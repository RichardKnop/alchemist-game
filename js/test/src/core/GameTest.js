/*global define, test, strictEqual*/
define([
	'core/ServiceManager',
    'core/Game'
], function (ServiceManager, Game) {

	"use strict";

    return function () {

        this.runTests = function () {

			function MockPuzzle() {
				this.setServiceManager = function (m) {
					this.serviceManager = m;
				};
				this.init = function () {
					return this;
				};
			}

			var serviceManager = new ServiceManager(),
				game = new Game();
			serviceManager.setService("SpotTheDifferencePuzzle", new MockPuzzle());
			serviceManager.setService("ShufflePuzzle", new MockPuzzle());
			game.setServiceManager(serviceManager);

            test("Test Game.getScore/getLevel/getPuzzlesSolved", function () {
                game.startNew();
				strictEqual(game.getScore(), 0);
				strictEqual(game.getLevel(), 1);
				strictEqual(game.getPuzzlesSolved(), 0);
            });

            test("Test Game.formatTime", function () {
				strictEqual(game.formatTime(45), "00:45");
				strictEqual(game.formatTime(90), "01:30");
				strictEqual(game.formatTime(120), "02:00");
            });

        };

    };

});