'use strict';

var controllers = angular.module('Controllers', ['Services']);

controllers.controller('HomeCtrl', function ($rootScope, $scope, VoiceService) {
	$scope.show_music_player = false;

	VoiceService.startup();

	$rootScope.$on('songDataChanged', function (event, song_info) {
		$scope.show_music_player = true;
		$scope.song_info = {};

		var formattedSongs = [];
		
		song_info.forEach(function(song){

			formattedSongs.push({
				name : song.name,
				artist : song.artists[0].name,
				album_name: song.album.name,
				album_img: song.album.images[1].url
			});
		});
		

		//$scope.song_info.name = 'Song: ' + song_info[0]['name'];
		//$scope.song_info.artist = 'Artist: ' + song_info[0]['artists'][0]['name'];
		//$scope.song_info.album_name = 'Album: ' + song_info[0]['album']['name'];
		//$scope.song_info.album_img = song_info[0]['album']['images'][1]['url'];

		$scope.all_songs = formattedSongs;


	});
});
