// GOALS

// find users location
// render map 
// show map based on users location
// show user location on map


// show start button at the bottom of the map


function renderMap (){
    mapboxgl.accessToken = 'pk.eyJ1IjoibG9wZWFyaXlvIiwiYSI6ImNrNWpkamFrcTAyM2IzZXBja3dncmtld3AifQ.-T1q9Tw23a3tqqJ9CYFllg';
    var map = new mapboxgl.Map({
        container: 'map', // container id
        style: 'mapbox://styles/mapbox/dark-v10', //hosted style id
        center: [-0.107639, 51.391750], // starting position [longitude, latitude], needs to be generated and shown on map 
        zoom: 15 // starting zoom
    });
}

renderMap()

function showMap(result){
    //   image.src = result.url
    //   imageTitle.innerText = result.name
    //   likes.innerText = result.like_count
}

function showCurrentLocation(){

}

// function showStartScreen(){
//     let instructionsCard = createElement('div', {
//         id: "start-btn",
//         innerText: "Start Hunt",
//         onClick: () => startGame()
//     })

//     let startButton = createElement('button', {
//         id: "start-btn",
//         innerText: "Start Hunt",
//         onClick: () => startGame()
//     })
// }

// function startGame(){
//     console.log("The hunt has started")
// }