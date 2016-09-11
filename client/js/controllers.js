angular.module('app', ['app.services'])

.controller('BikeController', function($scope, BikeService, MapService){

	map = MapService;
    map.init();

    $scope.openStation = function( station ){
    	if( station != $scope.currentStation ){
    		// now current is previous!
    		if($scope.currentStation)
	    		$scope.currentStation.isOpen = false;

	    	// update currentStation
	    	$scope.currentStation = station;
	    	$scope.currentStation.isOpen = true;
	    	MapService.centerTo({
	    		'lat' : station.position[0],
	    		'lng' : station.position[1]
	    	})
	    }
	    // applico la modifica
	    $scope.$apply();
    }

    $scope.closeStation = function(){
    	MapService.center();
    	$scope.currentStation.isOpen = false;
    	$scope.currentStation = null;
    }

	BikeService.getStations(function( stations ){
		$scope.stations = BikeService.addPhotos( stations );
		console.log(stations);

		map.addMarkers( $scope.stations, $scope.openStation );
		map.center();
	});


	$scope.range = function(count){
		var ratings = [];
		for (var i = 0; i < count; i++)
			ratings.push(i)
		return ratings;
	}
});