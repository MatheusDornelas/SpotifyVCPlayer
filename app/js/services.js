'use strict';

var services = angular.module("Services", []);

services.service("SpotifyService", function($rootScope, $q, $http)
{
  this.search_songs = function(specs)
  {
    var query = "";
    var track = null;

    // add song name info, if any is present
    if ("song" in specs)
    {
      query += specs["song"];
    }

    for (var key in specs)
    {
      if (key != "song")
      {
        query += " " + key + ":" + specs[key];
      }
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
                    track = response.data.tracks.items;
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

  this.search_artists = function(name)
  {
    var artist = null;

    return $http({
                  method : "GET",
                  url : "https://api.spotify.com/v1/search/",
                  params: {q: name, type: "artist"}
                 })
                .then(function(response)
                {
                  if (response.data.artists.items.length)
                  {
                    // TODO: show all tracks, and let the user decide
                    artist = response.data.artists.items[0];
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
                  return $q.when(artist);
                });
  }

  this.search_similar_artists = function(artist_id)
  {
    var artists = null;

    return $http({
                  method : "GET",
                  url : "https://api.spotify.com/v1/artists/" + artist_id +  "/related-artists/",
                 })
                .then(function(response)
                {
                  if (response.data.artists.length)
                  {
                    // TODO: show all tracks, and let the user decide
                    artists = response.data.artists;
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
                  return $q.when(artists);
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
      self.audio.src = song_data[0]["preview_url"];
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

  this._search_songs_by_genre = function(genre)
  {
    return self._search_songs({"genre": genre});
  }

  this._search_songs_by_artist = function(artist)
  {
    return self._search_songs({"artist": artist});
  }

  this._search_songs_by_name = function(song)
  {
    return self._search_songs({"song": song});
  }

  this._search_songs_by_name_and_artist = function(song, artist)
  {
    return self._search_songs({"song": song, "artist": artist});
  }

  this._search_artists_by_name = function(artist)
  {
    SpotifyService.search_artists(artist).then(function(artist_info)
    {
      SpotifyService.search_similar_artists(artist_info["id"]).then(function(artists)
      {
        SpotifyService.search_songs({"artist": artists[0]["name"]}).then(function(track)
        {
          AudioService.play(track);
        });
      });
    });
  }

  this._search_songs = function(specs)
  {
    SpotifyService.search_songs(specs).then(function(track)
    {
      AudioService.play(track);
    });
  }

  this._resume_song

  this.startup = function()
  {
    if (annyang)
    {
      var commands =
      {
        "play some *genre": self._search_songs_by_genre,
        "play something like *artist": self._search_artists_by_name,
        "play a song by *artist": self._search_songs_by_artist,
        "play *song by *artist": self._search_songs_by_name_and_artist,
        "play *song": self._search_songs_by_name,
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

      //self._search_songs_by_name('Hello');
  }
  else
  {
    console.error("The 'annyang' object was not found!");
  }
  }
});
