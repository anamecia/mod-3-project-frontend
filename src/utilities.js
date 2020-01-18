let playerCoordinates = null;

function findPlayerLocation() {

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }

    let options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };
    console.log("Locating...");

    function success(position) {

        var playerLatitude = position.coords.latitude;
        var playerLongitude = position.coords.longitude;
        playerCoordinates = {
            latitude: playerLatitude,
            longitude: playerLongitude
        };

        console.log("User's current latitude is " + playerLatitude + ".");
        console.log("User's current longitude is " + playerLongitude + ".");
        console.log(`Off by ${position.coords.accuracy} meters.`);
        
    }

    function error() {
        console.warn("Unable to retrieve your location");
    }

    navigator.geolocation.getCurrentPosition(success, error, options);
}

findPlayerLocation();