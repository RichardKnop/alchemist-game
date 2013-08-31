/*global define, test, strictEqual*/
define([
    'core/CookieManager'
], function (CookieManager) {

	"use strict";

    return function () {

        this.runTests = function () {

            var cookieManager = new CookieManager();

            test("Test CookieManager.save/load/remove", function () {
                strictEqual(cookieManager.load("foo"), null);
                cookieManager.save("foo", "bar");
                strictEqual(cookieManager.load("foo"), "bar");
                cookieManager.remove("foo");
                strictEqual(cookieManager.load("foo"), null);
            });

        };

    };

});