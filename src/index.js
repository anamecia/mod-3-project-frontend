
// Elements Finder
const startButtonContainer = document.querySelector('#start-btn');
const timerContainer = document.querySelector('#timer')
const minutesSpan = document.querySelector('#minutes')
const secondsSpan = document.querySelector('#seconds')
const colonSpan = document.querySelector('#colon')
const infoContainer = document.querySelector('#info')
const loadingContainer = document.querySelector('#loading')
const compassContainer = document.querySelector('.map-overlay-1')
const modalContainer = document.querySelector('.modal')
const distanceClueDisplay = document.querySelector('#distance-clue')
const clue = document.querySelector('#clue')
//Global Variables 

let playerCoords = null;
let compassMapStyleID = null;

let distanceClue = ""
const locationsUrl = "http://localhost:3000/locations/"

const playersGameLocations = []
const playerTimes = []
let playerScore = 0

//Main Functions

function findPlayerLocation(){

    if (!navigator.geolocation) {
        alert("Geolocation is not supported by your browser!"); //change to popup/modal
        return;
    }
    // console.log("Locating..."); //change to a loading screen


    function success(position) {

        loadingContainer.classList.add("hidden")
        compassContainer.classList.remove("hidden")

        let myLatitude = position.coords.latitude;
        let myLongitude = position.coords.longitude;

        playerCoords = {
            latitude: myLatitude,
            longitude: myLongitude
        };
        
        renderMap(playerCoords)
        renderCompass(playerCoords, compassMapStyleID)
        console.log("Located"); 
    }

    function error() {

        loadingContainer.classList.add("hidden")
        alert("Unable to retrieve your location");
    }

    navigator.geolocation.watchPosition(success, error)

}

function startGame(){
    startButtonContainer.remove()
    infoContainer.innerText = ""
    // alert("Answer the clues, to reveal the locations"); // change to popup
    modalContainer.classList.remove('hidden')
    getRandomIndex() 
    renderCompass(playerCoords)
} 

modalContainer.querySelector('button').addEventListener('touchstart',() => {
    modalContainer.classList.add("hidden")
})

findPlayerLocation();
