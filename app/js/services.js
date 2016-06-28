'use strict';

var services = angular.module("Services", []);

services.service("VoiceService", function($rootScope, commands)
{
  this.startup = function()
  {
    if (annyang)
    {
	  // Add commands to annyang
	  annyang.addCommands(commands);

	  // Tell KITT to use annyang
	  SpeechKITT.annyang();

	  // Define a stylesheet for KITT to use
	  SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

	  // Render KITT's interface
	  SpeechKITT.vroom();
	}
	else
	{
	  console.error("The 'annyang' object was not found!");
	}
  }
});