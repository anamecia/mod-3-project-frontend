
function displayCurrentPosition(){

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
    }else{
       findPlayerLocation();
    }
}

    // console.log("Locating..."); if we have time we will change this to a loading screen

function findPlayerLocation(){
    navigator.geolocation.watchPosition(renderMap)
    // navigator.geolocation.getCurrentPosition(renderMap)

}

    
function renderMap(position){
    debugger
    mapboxgl.accessToken = 'pk.eyJ1IjoibG9wZWFyaXlvIiwiYSI6ImNrNWpkamFrcTAyM2IzZXBja3dncmtld3AifQ.-T1q9Tw23a3tqqJ9CYFllg';

    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp', //hosted style id
        center: [position.coords.longitude, position.coords.latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
        zoom: 15 // starting zoom
    });

    map.on('load', () => {

        setInterval(()=>map.getSource('playerLocation').setData({"geometry":{"type": "Point","coordinates":[position.coords.longitude,position.coords.latitude]}, "type": "Feature", "properties": {}h}), 2000);

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
                            position.coords.longitude,
                            position.coords.latitude
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

    startButton.addEventListener("touchstart", startGame) 
    startButton.innerText = "Start Game"
    startButtonContainer.append(startButton)
}

function startGame(){ 
    alert("This game has started");
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

displayCurrentPosition();

 
