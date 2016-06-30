'use strict';

var services = angular.module("Services", []);

services.service("SpotifyService", function($rootScope, $q, $http)
{
  this.search_songs = function(song, artist)
  {
    var query = song;
    var track;

    if (artist)
    {
      query += " artist:" + artist;
    }

    return $http({
                  method : "GET",
                  url : "https://api.spotify.com/v1/search/",
                  params: {q: query, type: "track"}
                 })
                .then(function(response)
                {
                  if (response.data.tracks.items.length)
                  {
                    // TODO: show all tracks, and let the user decide
                    track = response.data.tracks.items[0];
                  }
                  else
                  {
                    // TODO: Notify empty search
                    console.error("Search returned no results.");
                  }
                },
                function(error)
                {
                  // TODO: Handle error!
                  console.error("Could not retrieve data from the Spotify API");
                })
                .then(function()
                {
                  return $q.when(track);
                });
  }
});

services.service("AudioService", function($rootScope, $http)
{
  var self = this;
  this.audio = new Audio();

  this.play = function(song_data)
  {
    if (song_data)
    {
      self.audio.src = song_data["preview_url"];
      self.audio.play();

      $rootScope.$broadcast("songDataChanged", song_data);
    }
  }

  this.stop = function()
  {
    console.info("Stopping song...");
    self.audio.pause();
  }

  this.resume = function()
  {
    console.info("Resuming song...");
    self.audio.play();
  }
});

services.service("VoiceService", function($rootScope, SpotifyService, AudioService)
{
  self = this;

  this._search_songs = function(song, artist)
  {
    SpotifyService.search_songs(song, artist).then(function(track)
    {
      AudioService.play(track);
    });
  }

  this._resume_song

  this.startup = function()
  {
    if (annyang)
    {
      var commands = {
        "play *song by *artist": self._search_songs,
        "play *song": self._search_songs,
        "stop": AudioService.stop,
        "resume": AudioService.resume,
      }

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
