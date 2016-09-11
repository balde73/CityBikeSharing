angular.module('app.services', [])

.service('API', function( $http ){
  return {

    send: function(url, method, headers, method_data, callback){

      var data    = ( method == "POST" ) ? "data" : "params";

      var options = {
        method:   method,
        url:      url,
        headers:  headers,
        transformRequest: function(obj) {
            var str = [];
            for(var p in obj)
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
            return str.join("&");
        }
      }
      options[data] = method_data;

      $http(options)
      .then(
        function successCallback( response ) {
          callback( response.data );
        }, function errorCallback( response ) {
          // gestire errore!
          response.error = true;
          callback( response );
        }
      );
    }
  }
})

.service('BikeService', function( API ){
    
    var getStations = function(callback){
    	API.send(	"https://os.smartcommunitylab.it/core.mobility/bikesharing/rovereto",
    				"GET",
    				null,
    				null,
    				callback);
    }

    var addPhotos = function( stations ){
    	angular.forEach(stations, function( station ){
    		station.photo = "https://maps.googleapis.com/maps/api/streetview?size=800x800&location="+station.position[0]+","+station.position[1]+"&fov=90&heading=235&pitch=10&key=AIzaSyC3r5VYy6WFPtkxrXPT9WmtUlZdbWEKhI8"
    	});
    	return stations;
    }

    return{
		getStations: getStations,
		addPhotos: addPhotos
	}
})

.service('MapService', function(){

	this.map = null;
	this.bounds = null;
	this.infowindow = null;

	var init = function(){
		var mapOptions = {
	        // How zoomed in you want the map to start at (always required)
	        zoom: 12,

	        // The latitude and longitude to center the map (always required)
	        center: new google.maps.LatLng(45.8946295, 11.043914), // initial position

	        // Style the map here if you want!
	    }

	    var mapElement = document.getElementById('map');

	    // Create the Google Map using our element and options defined above
	    this.map = new google.maps.Map(mapElement, mapOptions);
	    this.bounds = new google.maps.LatLngBounds();
		this.infowindow = new google.maps.InfoWindow();
	}

	var addMarkers = function( stations, callbackListener ){

		self = this;
		angular.forEach(stations, function( station ){

			var marker = new google.maps.Marker({
	            position: {lat: station.position[0], lng: station.position[1]},
	            title: 'Hello World!',
	            map: self.map
	        });

	        self.bounds.extend(marker.position);

	        marker.addListener('click', function() {
			    // chiamo la funzione in controller
			    callbackListener( station );
			});

	    })
	}

	var centerTo = function( pos ){
		this.map.panTo( pos );
		this.map.setZoom(15);
	}

	var center = function(){
		this.map.fitBounds(this.bounds);
		this.map.setZoom(13);
	}

	return {
		addMarkers: addMarkers,
		init: init,
		center: center,
		centerTo: centerTo
	}

})
