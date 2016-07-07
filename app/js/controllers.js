'use strict';

var controllers = angular.module("Controllers", ["Services"]);

controllers.controller("HomeCtrl", function($rootScope, $scope, VoiceService)
{
  $scope.show_music_player = false;

  VoiceService.startup();

  $rootScope.$on("songDataChanged", function(event, song_info)
    {
      $scope.show_music_player = true;
      $scope.song_info = {};
      $scope.similar_song_info = {};
      
      $scope.song_info.name = "Song: " + song_info[0]["name"];
      $scope.song_info.artist = "Artist: " + song_info[0]["artists"][0]["name"];
      $scope.song_info.album_name = "Album: " + song_info[0]["album"]["name"];
      $scope.song_info.album_img = song_info[0]["album"]["images"][1]["url"];

      console.log(song_info.slice(1,11))
      $scope.similar_song_array = song_info.slice(1,11);


    });
});
