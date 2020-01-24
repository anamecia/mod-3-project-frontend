function renderCompass(position){
    
    mapboxgl.accessToken = mapAccessToken;

    let compass = new mapboxgl.Map({
        container: 'compass-map', // container id
        style: "mapbox://styles/lopeariyo/ck5jfumur1xbt1imwh82f1ugp", //plain map
        center: [position.longitude, position.latitude], // starting position [longitude, latitude], needs to be generated and shown on map 
        zoom: 15 // starting zoom
    });


    function switchCompassStyle(layerID) {
        compass.setStyle(`mapbox://styles/${layerID}`);
    }

    if (compassMapStyleID){
        switchCompassStyle(compassMapStyleID)
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

        //DEVICE ORIENTATION FOR COMPASS
        // window.addEventListener("deviceorientation", (event) => {
        //     let heading = event.webkitCompassHeading
        //     document.getElementById("compass").style.transform = `rotate(${heading}deg)`
        //     compass.setBearing(heading)
        // })

        window.addEventListener("deviceorientation", function(event) {
            
            let alpha = event.alpha
            document.querySelector("#compass").style.transform = `rotate(${alpha}deg)` //compass container image
            compass.setBearing(alpha) //compass map
        })
    })

}
