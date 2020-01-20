function findPlayerLocation (){

    if (!navigator.geolocation) {
        console.log("Geolocation is not supported by your browser");
        return;
    }

    // console.log("Locating..."); if we have time we will change this to a loading screen

    navigator.geolocation.getCurrentPosition((position) => {

        let playerCoordinates = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude, 
            accuracy: position.coords.accuracy
        };

        console.log("User's current latitude is " + playerCoordinates.latitude + ".");
        console.log("User's current longitude is " + playerCoordinates.longitude + ".");
        console.log("User's co-ordinates is off by " + playerCoordinates.accuracy + " metres.");

        // renderMap(playerCoordinates.latitude, playerCoordinates.longitude)
        renderMap(playerCoordinates.latitude, playerCoordinates.longitude)

    })   
}

function renderMap (latitude, longitude){

    mapboxgl.accessToken = 'pk.eyJ1IjoibG9wZWFyaXlvIiwiYSI6ImNrNWpkamFrcTAyM2IzZXBja3dncmtld3AifQ.-T1q9Tw23a3tqqJ9CYFllg';
    
    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp', //hosted style id
        center: [longitude, latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
        zoom: 15 // starting zoom
    });

    map.on('load', () => {

        map.addSource('playerLocation', {
            'type': 'geojson', 
            data: {
                'type': 'FeatureCollection', 
                'features': [
                {
                    'type': 'Feature', 
                    'properties': {},
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [
                            longitude,
                            latitude
                        ]
                    }
                }
                ]
            }
        })
    
        map.addLayer({
            id: 'points',
            source: 'playerLocation',
            type: 'circle',
            paint: {
                'circle-radius': 10,
                'circle-color': 'skyblue'
            }
        });




    });
    
    
    
}

findPlayerLocation() 
