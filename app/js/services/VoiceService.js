services.service('VoiceService', ['$rootScope', 'SpotifyService', 'AudioService', function ($rootScope, SpotifyService, AudioService){

	self = this;

	this._search_songs_by_genre = function (genre){

		return self._search_songs({ genre: genre });
	};

	this._search_songs_by_artist = function (artist){
		return self._search_songs({ artist: artist, });
	};

	this._search_songs_by_name = function (song){
		
		return self._search_songs({ song: song });
	};

	this._search_songs_by_name_and_artist = function (song, artist){
		return self._search_songs({ song: song, artist: artist, });
	};

	this._search_artists_by_name = function (artist){
		SpotifyService.search_artists(artist).then(function (artist_info){
			SpotifyService.search_similar_artists(artist_info['id']).then(function (artists){
				SpotifyService.search_songs({ artist: artists[0]['name'], }).then(function (track){
					AudioService.play(track[0]);
				});
			});
		});
	};

	this._search_songs = function (specs){
		SpotifyService.search_songs(specs).then(function (track){
			AudioService.play(track[0]);
		});
	};

	this._resume_song;

	this.startup = function (){
		if (annyang) {
			var commands =
				{
					'play some *genre': self._search_songs_by_genre,
					'play something like *artist': self._search_artists_by_name,
					'play a song by *artist': self._search_songs_by_artist,
					'play *song by *artist': self._search_songs_by_name_and_artist,
					'play *song': self._search_songs_by_name,
					stop: AudioService.stop,
					resume: AudioService.resume,
				};

			// Add commands to annyang
			annyang.addCommands(commands);

			// Tell KITT to use annyang
			SpeechKITT.annyang();

			// Define a stylesheet for KITT to use
			SpeechKITT.setStylesheet('//cdnjs.cloudflare.com/ajax/libs/SpeechKITT/0.3.0/themes/flat.css');

			// Render KITT's interface
			SpeechKITT.vroom();

			this._search_songs_by_name('hello');

		} else {
			console.error('The \'annyang\' object was not found!');
		}
	};
}]);
