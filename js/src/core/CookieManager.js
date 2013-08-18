define([], function() {

    return function() {

        var that = this;

        this.setServiceManager = function(manager) {
            this.serviceManager = manager;
        };

        this.save = function(name, value) {
            setCookie(name, value, getExpirationDate());
        };

        this.load = function(name) {
            return getCookie(name);
        };

        this.remove = function(name) {
            deleteCookie(name);
        };

        function setCookie(name, value, expires, path, domain) {
            var cookie = name + "=" + escape(value) + ";";
            if (expires) {
                // If expires is an instance of Date
                if (expires instanceof Date) {
                    // If it is invalid date
                    if (isNaN(expires.getTime())) {
                        expires = new Date();
                    }
                } else {
                    expires = new Date(new Date().getTime() + parseInt(expires) * 1000 * 60 * 60 * 24);
                }
                cookie += "expires=" + expires.toGMTString() + ";";
            }
            if (path) {
                cookie += "path=" + path + ";";
            }
            if (domain) {
                cookie += "domain=" + domain + ";";
            }
            document.cookie = cookie;
        }

        function getCookie(name) {
            var regexp = new RegExp("(?:^" + name + "|;\\s*" + name + ")=(.*?)(?:;|$)", "g");
            var result = regexp.exec(document.cookie);
            return (result === null) ? null : result[1];
        }

        function getExpirationDate() {
            return new Date(new Date().getTime() + 10000);
        }

        function deleteCookie(name, path, domain) {
            // If the cookie exists
            if (getCookie(name)) {
                setCookie(name, "", -1, path, domain);
            }
        }

    };

});
