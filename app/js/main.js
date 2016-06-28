'use strict';

var app = angular.module("SpotifyVCPlayer", ["ngRoute", "Controllers"]);

// Constants
app.constant("commands",
{
  "play *song by *artist": function(song, artist) {console.info("Song: " + song + ", Artist: " + artist);},
  "play *song": function(song) {console.info("Song: " + song);},
  "stop": function(song) {console.info("Stop");},
  "resume": function(song) {console.info("Resume");},
});

// Routes
app.config(function ($routeProvider)
{
  $routeProvider
    .when('/',
    {
      templateUrl: 'partial_html/home.html',
      controller: 'HomeCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
