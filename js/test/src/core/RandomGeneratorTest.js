/*global define, test, strictEqual, ok*/
define([
	"core/RandomGenerator"
], function (RandomGenerator) {

	"use strict";

	return function () {

		var generator = new RandomGenerator();
		generator.setMaximumX(10);
		generator.setMaximumY(10);
		generator.setMaximum(10);

		this.runTests = function () {

			test("Test RandomGenerator.generateInteger", function () {
				var i = generator.generateInteger();
				ok(0 === i % 1);
            });

			test("Test RandomGenerator.generateCoordinate", function () {
				var c = generator.generateCoordinate();
				ok(0 === c.x % 1);
				ok(0 === c.y % 1);
            });

		};

	};

});