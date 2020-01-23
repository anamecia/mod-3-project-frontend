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
    newLocationButton.innerText = "Generate New Location"
    newLocationButton.addEventListener("touchstart", startGame)
    infoContainer.append(missedLocationInfo, newLocationButton)
}

function renderEndOfGameInfo(){
    const congratulationsInfo = document.createElement("p")
    congratulationsInfo.innerText = `Congratulations you found ${playersGameLocations.length} with a score of ${playerScore}`
    infoContainer.append(congratulationsInfo)
}