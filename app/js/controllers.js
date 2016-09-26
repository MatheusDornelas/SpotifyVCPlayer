'use strict';

var controllers = angular.module('Controllers', ['Services', ]);

controllers.controller('HomeCtrl', function ($rootScope, $scope, VoiceService) {
	$scope.show_music_player = false;

	VoiceService.startup();

	$rootScope.$on('songDataChanged', function (event, song_info) {
		$scope.show_music_player = true;
		$scope.song_info = {};

		$scope.song_info.name = 'Song: ' + song_info['name'];
		$scope.song_info.artist = 'Artist: ' + song_info['artists'][0]['name'];
		$scope.song_info.album_name = 'Album: ' + song_info['album']['name'];
		$scope.song_info.album_img = song_info['album']['images'][1]['url'];
	});
});
