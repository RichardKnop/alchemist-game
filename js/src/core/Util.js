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
		},

		isDisplayingTextMessage: false,

		displayTextMessage: function (message, callback) {
			/*jslint browser:true */
			var textMessage, that = this;
			this.isDisplayingTextMessage = true;
			textMessage = document.getElementById("text-message");
			if (null === textMessage) {
				textMessage = document.createElement("div");
				textMessage.id = "text-message";
				textMessage.innerHTML = message;
				document.getElementsByClassName("container")[0].appendChild(textMessage);
			}
			textMessage.className += " animated fadeInDown";
			setTimeout(function () {
				textMessage.className += " fadeOutDown";
				setTimeout(function () {
					textMessage.parentNode.removeChild(textMessage);
					if (callback) {
						callback();
					}
					that.isDisplayingTextMessage = false;
				}, 1000);
			}, 1000);
		}

	};

});