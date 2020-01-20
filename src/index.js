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

        // console.log("User's current latitude is " + playerCoordinates.latitude + ".");
        // console.log("User's current longitude is " + playerCoordinates.longitude + ".");

        // renderMap(playerCoordinates.latitude, playerCoordinates.longitude)
        // return playerCoordinates
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

        window.setInterval( function (){
            console.log("Here's something interesting")
        }, 2000)

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
     //touch events - touchstart, touchend, touchmove, touchcancel

    let startButtonContainer = document.querySelector('.map-overlay');
    let startButton = document.createElement('button');

    startButton.addEventListener("touchend", startGame) 
    startButton.innerText = "Start Game"
    startButtonContainer.append(startButton)

    
}

function startGame(){
    
    alert("The hunt has begun")
}



// function myFunction(x) {
//     if (x.matches) { // If media query matches


//     } else {
//         alert("You need to be using a phone for this application to work")
//         document.body.style.backgroundColor = "red";
//     }
// }

// var x = window.matchMedia("(max-width: 700px)")

// myFunction(x) // Call listener function at run time
// x.addListener(myFunction) // Attach listener function on state changes



findPlayerLocation() 
// renderMap(playerCoordinates.latitude, playerCoordinates.longitude)
