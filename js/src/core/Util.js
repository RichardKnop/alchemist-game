/*global define*/
define([], function () {

	"use strict";

	return {

		playSuccessSound: function () {
			/*jslint browser:true */
			var successSound = document.getElementById("success-sound");
			successSound.currentTime = 0;
			successSound.play();
		},

		playSlideSound: function () {
			/*jslint browser:true */
			var slideSound = document.getElementById("slide-sound");
			slideSound.currentTime = 0;
			slideSound.play();
		},
		
		removeClass: function (el, className) {
			var regex = new RegExp('\\b' + className + '\\b');
			el.className = el.className.replace(regex, "");
		}

	};

});