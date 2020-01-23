// Create Element Functions

function createElement(tag, options = {}) {
    const el = document.createElement(tag)
    if (options.innerText) el.innerText = options.innerText
    if (options.src) el.src = options.src
    if (options.className) el.className = options.className
    if (options.onMouseOver) el.addEventListener('mouseover', options.onMouseOver)
    if (options.onMouseLeave) el.addEventListener('mouseleave', options.onMouseLeave)
    return el
}


const mapAccessToken = 'pk.eyJ1IjoibG9wZWFyaXlvIiwiYSI6ImNrNWpkamFrcTAyM2IzZXBja3dncmtld3AifQ.-T1q9Tw23a3tqqJ9CYFllg'
// Render Element Functions

function renderMap(position, mapStyleID){

    
    startButtonContainer.innerText="";

    mapboxgl.accessToken = mapAccessToken;


    let map = new mapboxgl.Map({
        container: 'map', // container id
        style: "mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp", //hosted style id
        center: [position.longitude, position.latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
        zoom: 15 // starting zoom
    });

    function switchLayer(layerID) {
        map.setStyle(`mapbox://styles/${layerID}`);
    }

    if (mapStyleID){
        switchLayer(mapStyleID)
    }


    var size = 100;

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

function renderCompass(position, mapStyleID ){
    
    mapboxgl.accessToken = mapAccessToken;

    let compass = new mapboxgl.Map({
        container: 'compass-map', // container id
        style: "mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp", //hosted style id
        center: [position.longitude, position.latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
        zoom: 18 // starting zoom
    });

    // function switchLayer(layerID) {
    //     compass.setStyle(`mapbox://styles/${layerID}`);
    // }

    // if (mapStyleID){
    //     switchLayer(mapStyleID)
    // }

    var size = 100;

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
        compass.triggerRepaint();

        // return `true` to let the map know that the image was updated
        return true;
    }
    };


    compass.on('load', () => { 
    
        compass.addImage("pulsing-dot", pulsingDot, { pixelRatio: 2 });
        
        setInterval(
            ()=> compass.getSource('playerLocation').setData(
                {
                "geometry":{
                    "type": "Point",
                    "coordinates":[position.longitude,position.latitude]}, 
                    "type": "Feature", 
                    "properties":{}
                }), 2000);

        compass.addSource('playerLocation', {
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
    
        compass.addLayer({
            id: 'points',
            type: 'symbol',
            source: 'playerLocation',
            layout: {
                'icon-image': "pulsing-dot"
            }
        });

        window.addEventListener("deviceorientation", (event) => {
            let heading = event.webkitCompassHeading
            document.getElementById("compass").style.transform = `rotate(${heading}deg)`
            compass.setBearing(heading)
        })
    })

}

function renderStartButton(){
    const startButton = document.createElement('button');

    startButton.addEventListener("touchstart", startGame) ;
    startButton.innerText = "Start Game";
    startButtonContainer.append(startButton);
}

function renderLocationFound(){
    const locationFoundInfo = document.createElement("p")
    locationFoundInfo.innerText = "You have arraived at you location"
    const newLocationButton = document.createElement("button")
    newLocationButton.innerText = "Generate New Location"
    newLocationButton.addEventListener("touchstart", startGame)
    infoContainer.append(locationFoundInfo, newLocationButton)
}

function renderOutOfTimeStatus(){
    const missedLocationInfo = document.createElement("p")
    missedLocationInfo.innerText = "You didn't get there in time :(!"
    const newLocationButton = document.createElement("button")
    newLocationButton.innerText = "Next Location"
    newLocationButton.addEventListener("touchstart", startGame)
    infoContainer.append(missedLocationInfo, newLocationButton)
}

function renderEndOfGameInfo(){
    const congratulationsInfo = document.createElement("p")
    congratulationsInfo.innerText = `Congratulations you found ${playersGameLocations.length} with a score of ${playerScore}`
    infoContainer.append(congratulationsInfo)
}