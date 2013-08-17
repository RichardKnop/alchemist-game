define([], function() {

	"use strict";

	return function() {
		
		var that = this, services = {};
		
		this.setService = function(name, object) {
			services[name] = object;
			object.setServiceManager(that);
		};
		
		this.getService = function(name) {
			if (name in services) {
				return services[name];
			}
			throw "'" + name + "' not found in service manager";
		};
		
	};

});