services.service('AudioService', function ($rootScope, $http){
	var self = this;
	this.audio = new Audio();

	this.play = function (song_data){
		
		if (song_data) {
			self.audio.src = song_data['preview_url'];
			self.audio.play();
		}
	};

	this.stop = function (){
		console.info('Stopping song...');
		self.audio.pause();
	};

	this.resume = function (){
		console.info('Resuming song...');
		self.audio.play();
	};
});