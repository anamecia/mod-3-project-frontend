function findPlayerLocation (){

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }

    // console.log("Locating..."); if we have time we will change this to a loading screen

    navigator.geolocation.getCurrentPosition((position) => {

        let playerCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };

        console.log("User's current latitude is " + playerCoordinates.latitude + ".");
        console.log("User's current longitude is " + playerCoordinates.longitude + ".");

    })
    
}

findPlayerLocation()
