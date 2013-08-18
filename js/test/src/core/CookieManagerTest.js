define([
    'core/CookieManager'
], function(CookieManager) {

    return function() {
		
        this.runTests = function() {

            var cookieManager = new CookieManager();

            test("Test cookiemanager.save/load", function() {
                
                strictEqual(cookieManager.load("foo"), null);
                cookieManager.save("foo", "bar");
                strictEqual(cookieManager.load("foo"), "bar");

                cookieManager.remove("foo");
                strictEqual(cookieManager.load("foo"), null);

            });

        };
		
    };

});