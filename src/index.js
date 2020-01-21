
//global variables 
const startButtonContainer = document.querySelector('#start-btn');
const timerContainer = document.querySelector('#timer')
const minutesSpan = document.querySelector('#minutes')
const secondsSpan = document.querySelector('#seconds')
const dotesSpan = document.querySelector('#dotes')
const infoContainer = document.querySelector('#info')
const playersGameLocations = []
let playerCoords = null;
const wasabi = {
    latitude: 51.520269,
    longitude: -0.087066
}

//main functions

const wasabiLatitude = 51.520269
const wasabiLongitude = -0.087066

function findPlayerLocation(){

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser"); //change to popup/modal
        return;
    }
        getPlayerLocation ()

    // navigator.geolocation.watchPosition(renderMap)
}

function getPlayerLocation (){
    function success(position) {

        var myLatitude = position.coords.latitude;
        var myLongitude = position.coords.longitude;

        playerCoords = {
            latitude: myLatitude,
            longitude: myLongitude
        };

        // output.innerHTML = '<p>Latitude is ' + mylatitude + '° <br>Longitude is ' + mylongitude + '°</p>';
        renderMap(playerCoords)
    }

    function error() {
        // output.innerHTML = "Unable to retrieve your location";
        alert("Unable to retrieve your location");
    }

    navigator.geolocation.watchPosition(success, error)

}


function findDistanceBetweenPlayerAndLocation (p1, p2){

        if (!p1 || !p2) {
            return 0;
        } else if (p1.latitude == p2.latitude && p1.longitude == p2.longitude) {
            return 0;
        } else {
            var radlat1 = (Math.PI * p1.latitude) / 180;
            var radlat2 = (Math.PI * p2.latitude) / 180;
            var theta = p1.longitude- p2.longitude;
            var radtheta = (Math.PI * theta) / 180;
            var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = dist * 1.609344;
            
        return dist;
        }
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

    // alert("The hunt has begun"); // change to popup
    startButtonContainer.remove()
    
    let distance = findDistanceBetweenPlayerAndLocation(wasabi, playerCoords)

    renderTimer();
} 

function renderTimer(){
    let totalSeconds = 0
    let setId1 = setInterval(setTime, 1000);

    function setTime(){
        ++totalSeconds
        secondsSpan.innerText = pad(totalSeconds % 60);
        minutesSpan.innerText = pad(parseInt(totalSeconds / 60));
        dotesSpan.innerText = ":"
    }

    function pad(val){
        let valString = val + "";
        if (valString.length < 2) {
          return "0" + valString;
        } else {
          return valString;
        }
    }
    stopTimer(setId1)
}

function stopTimer(setId){
    
    let setId2 =setInterval(()=>{
        if(parseInt(secondsSpan.innerText) >= 5){
            clearInterval(setId)
            if(playersGameLocations.length < 5){
                clearInterval(setId2)
                timerContainer.innerText = ""
                missedLocation()

            }else{

            }
        }
    },1500)   
}

function missedLocation(){
    const missedLocationInfo = document.createElement("p")
    missedLocationInfo.innerText = "You have missed your location!"
    debugger
    const newLocationButton = document.createElement("button")
    newLocationButton.innerText = "Generate New Location"
    infoContainer.append(missedLocationInfo, newLocationButton)
}



findPlayerLocation();




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


 
