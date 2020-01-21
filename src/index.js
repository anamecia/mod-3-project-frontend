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

    var size = 200;

    // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
    // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
    var pulsingDot = {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),

    // get rendering context for the map canvas when layer is added to the map
    onAdd: function() {
        var canvas = document.createElement("canvas");
        canvas.width = this.width;
        canvas.height = this.height;
        this.context = canvas.getContext("2d");
    },

    // called once before every frame where the icon will be used
    render: function() {
        var duration = 1000;
        var t = (performance.now() % duration) / duration;

        var radius = (size / 2) * 0.3;
        var outerRadius = (size / 2) * 0.7 * t + radius;
        var context = this.context;

        // draw outer circle
        context.clearRect(0, 0, this.width, this.height);
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, outerRadius, 0, Math.PI * 2);
        context.fillStyle = "rgba(135, 206, 235," + (1 - t) + ")";
        context.fill();

        // draw inner circle
        context.beginPath();
        context.arc(this.width / 2, this.height / 2, radius, 0, Math.PI * 2);
        context.fillStyle = "rgba(135, 206, 235)";
        context.strokeStyle = "white";
        context.lineWidth = 2 + 4 * (1 - t);
        context.fill();
        context.stroke();

        // update this image's data with data from the canvas
        this.data = context.getImageData(0, 0, this.width, this.height).data;

        // continuously repaint the map, resulting in the smooth animation of the dot
        map.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
    };

    map.on('load', () => {

        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });

        map.addSource('playerLocation', {
            'type': 'geojson', 
            data: {
                'type': 'FeatureCollection', 
                'features': [
                {
                    'type': 'Feature', 
                    'geometry': {
                        'type': 'Point',
                        'coordinates': [longitude, latitude]
                    }
                }
                ]
            }
        })
    
        map.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'playerLocation',
            layout: {
                'icon-image': "pulsing-dot"
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
