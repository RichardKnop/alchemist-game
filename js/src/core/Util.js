/*global define*/
define([], function () {

	"use strict";

	var successSound = new Audio("sound/success.wav"),
		slideSound = new Audio("sound/slide.wav"),
		soundtrack = new Audio("sound/soundtrack.wav"),
		isDisplayingTextMessage = false;

	return {

		playSuccessSound: function () {
			successSound.currentTime = 0;
			successSound.play();
		},

		playSlideSound: function () {
			slideSound.currentTime = 0;
			slideSound.play();
		},

		startSoundtrack: function () {
			soundtrack.play();
			soundtrack.addEventListener('ended', function () {
				setTimeout(function () {
					soundtrack.currentTime = 0;
					soundtrack.play();
				}, 5000);
			}, false);
		},
		
		removeClass: function (el, className) {
			var regex = new RegExp('\\b' + className + '\\b');
			el.className = el.className.replace(regex, "");
		},

		displayTextMessage: function (message, callback) {
			/*jslint browser:true */
			var textMessage, that = this;
			isDisplayingTextMessage = true;
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
					isDisplayingTextMessage = false;
				}, 1000);
			}, 1000);
		},

		isDisplayingTextMessage: function () {
			return isDisplayingTextMessage;
		}

	};

});