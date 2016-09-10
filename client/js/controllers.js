angular.module('app', ['app.services'])

.controller('BikeController', function($scope, BikeService, MapService){

	map = MapService;
    map.init();
    previusOpenStation = null;

    $scope.openStation = function( station ){
    	if( station != $scope.currentStation ){
	    	$scope.currentStation = station;
	    	station.isOpen = true;

	    	if(previusOpenStation)
	    		previusOpenStation.isOpen = false;
	    	previusOpenStation = station;

	    	// applico la modifica
	    	$scope.$apply();
	    }
    }

	BikeService.getStations(function( stations ){
		$scope.stations = BikeService.addPhotos( stations );
		console.log(stations);

		map.addMarkers( $scope.stations, $scope.openStation );

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