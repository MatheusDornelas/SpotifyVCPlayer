var services = angular.module('Services', []);
var controllers = angular.module('Controllers', ['Services', ]);
var app = angular.module('SpotifyVCPlayer', ['ngRoute', 'Controllers', ]);

// Routes
app.config(function ($routeProvider) {
	$routeProvider.when('/',
		{
			templateUrl: 'partial_html/home.html',
			controller: 'HomeCtrl',
		}).otherwise({
			redirectTo: '/',
		});
});
