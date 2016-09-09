angular.module('app', ['app.services'])

.controller('BikeController', function($scope, BikeService, MapService){

	map = MapService;
    map.init();
    previusOpenStation = null;

    var openStation = function( station ){
    	$scope.currentStation = station;
    	console.log( station );

    	station.isOpen = true;

    	if(previusOpenStation)
    		previusOpenStation.isOpen = false;
    	previusOpenStation = station;

    	// applico la modifica
    	$scope.$apply();
    }

	BikeService.getStations(function( stations ){
		$scope.stations = stations;
		console.log(stations);

		map.addMarkers( $scope.stations, openStation );

		map.center();
	});


	$scope.range = function(count){
		var ratings = []; 

		for (var i = 0; i < count; i++) { 
			ratings.push(i) 
		} 

		return ratings;
	}

    $scope.ciao = "piacere";
});