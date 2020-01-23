

// Elements Finder
const startButtonContainer = document.querySelector('#start-btn');
const timerContainer = document.querySelector('#timer')
const minutesSpan = document.querySelector('#minutes')
const secondsSpan = document.querySelector('#seconds')
const colonSpan = document.querySelector('#colon')
const infoContainer = document.querySelector('#info')

//Global Variables 

let playerCoords = null;
let mapStyleID = null;

const wasabi = {
    latitude: 51.520269,
    longitude: -0.087066
}
const boots = {
    latitude: 51.518764,
    longitude: -0.088231
}
const mands = {
    latitude: 51.59599,
    longitude: -0.087077
}

const croydon = {
    latitude: 51.378643,
    longitude: -0.102535
}


const playersGameLocations = []
const playerTimes = []
let playerScore = 0

//Main Functions

function findPlayerLocation(){

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser!"); //change to popup/modal
        return;
    }

    console.log("Locating..."); //change to a loading screen

    function success(position) {

        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;

        playerCoords = {
            latitude: myLatitude,
            longitude: myLongitude
        };
        
        renderMap(playerCoords, mapStyleID)
        console.log("Located"); 
    }

    function error() {
        alert("Unable to retrieve your location");
    }

    navigator.geolocation.watchPosition(success, error)

}

function startGame(){
    startButtonContainer.remove()
    infoContainer.innerText = ""
    alert("Answer the clues, to reveal the locations"); // change to popup
    getRandomLocation() 
    renderCompass(playerCoords)
} 

findPlayerLocation();
