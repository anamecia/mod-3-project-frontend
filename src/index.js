
//global variables 
const startButtonContainer = document.querySelector('.map-overlay');


//main function
function displayCurrentPosition(){
    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser");
    }else{
        findPlayerLocation();
    }
}

function findPlayerLocation(){
    navigator.geolocation.watchPosition(renderMap)
    // navigator.geolocation.getCurrentPosition(renderMap)
}

function renderMap(position){
    startButtonContainer.innerText="";
    mapboxgl.accessToken = 'pk.eyJ1IjoibG9wZWFyaXlvIiwiYSI6ImNrNWpkamFrcTAyM2IzZXBja3dncmtld3AifQ.-T1q9Tw23a3tqqJ9CYFllg';

    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp', //hosted style id
        center: [position.coords.longitude, position.coords.latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
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

    renderStartButton();

    map.on('load', () => { 
    
        map.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
        
        setInterval(
            ()=> map.getSource('playerLocation').setData(
                {
                "geometry":{
                    "type": "Point",
                    "coordinates":[position.coords.longitude,position.coords.latitude]}, 
                    "type": "Feature", 
                    "properties":{}
                }), 2000);

        map.addSource('playerLocation', {
            'type': 'geojson', 
            data: {
                'type': 'FeatureCollection', 
                'features': [
                {
                    'type': 'Feature', 
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
            type: 'symbol',
            source: 'playerLocation',
            layout: {
                'icon-image': "pulsing-dot"
            }
        });
    });
}



function renderStartButton(){
    const startButton = document.createElement('button');

    startButton.addEventListener("touchstart", startGame) ;
    startButton.innerText = "Start Game";
    startButtonContainer.append(startButton);
}

function startGame(){
    
    alert("The hunt has begun");
}


displayCurrentPosition();


// console.log("Locating..."); if we have time we will change this to a loading screen

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


 
