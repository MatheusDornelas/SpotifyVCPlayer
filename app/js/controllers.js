'use strict';

var controllers = angular.module("Controllers", ["Services"]);

controllers.controller("HomeCtrl", function($rootScope, $scope, VoiceService)
{
  VoiceService.startup();
});
