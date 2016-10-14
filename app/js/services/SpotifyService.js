services.service('SpotifyService', function ($rootScope, $q, $http){
	this.search_songs = function (specs){
		var query = '';
		var track = null;
		
		// add song name info, if any is present
		if ('song' in specs) {
			query += specs['song'];
		}

		for (var key in specs) {
			if (key != 'song') {
				query += ' ' + key + ':' + specs[key];
			}
		}

		return $http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/search/',
			params: { q: query, type: 'track', },
		}).then(function (response){
			if (response.data.tracks.items.length) {
				// TODO: show all tracks, and let the user decide
				track = response.data.tracks.items.slice(0,6);

				$rootScope.$broadcast('songDataChanged', track);
			} else {
				// TODO: Notify empty search
				console.error('Search returned no results.');
			}
		},
		function (error){
			// TODO: Handle error!
			console.error('Could not retrieve data from the Spotify API');
		}).then(function (){
			return $q.when(track);
		});
	};

	this.search_artists = function (name){
		var artist = null;

		return $http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/search/',
			params: { q: name, type: 'artist', },
		}).then(function (response){
			if (response.data.artists.items.length) {
				// TODO: show all tracks, and let the user decide
				artist = response.data.artists.items[0];
			} else {
				// TODO: Notify empty search
				console.error('Search returned no results.');
			}
		},
		function (error){
			// TODO: Handle error!
			console.error('Could not retrieve data from the Spotify API');
		}).then(function (){
			return $q.when(artist);
		});
	};

	this.search_similar_artists = function (artist_id){
		var artists = null;

		return $http({
			method: 'GET',
			url: 'https://api.spotify.com/v1/artists/' + artist_id +  '/related-artists/',
		}).then(function (response){
			if (response.data.artists.length) {
				// TODO: show all tracks, and let the user decide
				artists = response.data.artists;
			} else {
				// TODO: Notify empty search
				console.error('Search returned no results.');
			}
		},
		function (error){
			// TODO: Handle error!
			console.error('Could not retrieve data from the Spotify API');
		}).then(function (){
			return $q.when(artists);
		});
	};
});