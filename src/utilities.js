let playerCoordinates = null;        

function findPlayerLocation() {

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }

    // let options = {
    //     enableHighAccuracy: true,
    //     timeout: 5000,
    //     maximumAge: 0
    // };
    console.log("Locating...");

    function success(position) {

        playerCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        console.log("User's current latitude is " + playerCoordinates.latitude + ".");
        console.log("User's current longitude is " + playerLongitude.longitude + ".");
        console.log(`Off by ${position.coords.accuracy} meters.`);
        return playerCoordinates   
    }

    function error() {
        console.warn("Unable to retrieve your location");
    }
    navigator.geolocation.getCurrentPosition(success, error);
}