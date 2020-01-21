
//global variables 
const startButtonContainer = document.querySelector('.map-overlay');
let playerCoords = null;
const wasabi = {
    latitude: 51.520269,
    longitude: -0.087066
}
const chiswellStreet = {
    latitude: 51.520485,
    longitude: -0.087519
}

//main functions

function findPlayerLocation(){

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser"); //change to popup/modal
        return;
    }

        getPlayerLocation ()

    // navigator.geolocation.watchPosition(renderMap)
}

function getPlayerLocation (){

    console.log("Locating..."); //change to a loading screen


    function success(position) {

        var myLatitude = position.coords.latitude;
        var myLongitude = position.coords.longitude;

        playerCoords = {
            latitude: myLatitude,
            longitude: myLongitude
        };

        // output.innerHTML = '<p>Latitude is ' + mylatitude + '° <br>Longitude is ' + mylongitude + '°</p>';
       // alert("Your current coords are " +  playerCoords.latitude + playerCoords.longitude)
        renderMap(playerCoords)
        console.log("Located"); 
    }

    function error() {
        // output.innerHTML = "Unable to retrieve your location";
        alert("Unable to retrieve your location");
    }

    navigator.geolocation.watchPosition(success, error)

}

function renderMap(position){

    startButtonContainer.innerText="";
    mapboxgl.accessToken = 'pk.eyJ1IjoibG9wZWFyaXlvIiwiYSI6ImNrNWpkamFrcTAyM2IzZXBja3dncmtld3AifQ.-T1q9Tw23a3tqqJ9CYFllg';

    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp', //hosted style id
        center: [position.longitude, position.latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
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
                    "coordinates":[position.longitude,position.latitude]}, 
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
                            position.longitude,
                            position.latitude
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
    startButtonContainer.remove()
    alert("The hunt has begun"); // change to popup

    distanceMonitorFunction() 
    
}

findPlayerLocation();
