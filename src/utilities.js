function trackDistance(locationCoordinates){
    
    let distanceMonitor = setInterval(
    () => findDistanceBetweenPlayerAndLocation(playerCoords, locationCoordinates), 1000);


    trackTime(distanceMonitor)

    function findDistanceBetweenPlayerAndLocation (playerPosition, locationCoordinates){

        if (!playerPosition || !locationCoordinates) {
            return 0.00;
        } else if (playerPosition.latitude == locationCoordinates.latitude && playerPosition.longitude == locationCoordinates.longitude) {
            playersGameLocations.push(locationCoordinates);
            showDistanceBetweenPlayerAndLocation(0.00);
            return 0.00; 
        } else {
            var playersLatitudeInRadians = (Math.PI * playerPosition.latitude) / 180; 
            var locationLatitudeInRadians = (Math.PI * locationCoordinates.latitude) / 180; 
            var theta = playerPosition.longitude - locationCoordinates.longitude;
            var thetaInRadians = (Math.PI * theta) / 180;
            
            var distance =
                Math.sin(playersLatitudeInRadians) * Math.sin(locationLatitudeInRadians) +
                Math.cos(playersLatitudeInRadians) * Math.cos(locationLatitudeInRadians) * Math.cos(thetaInRadians)

            if (distance > 1) {
                distance = 1;
            }

            distance = Math.acos(distance);
            distance = (distance * 180) / Math.PI;
            distance = distance * 60 * 1.1515;
            distance = (distance * 1.609344);

            shortenedDistance = distance.toFixed(2);

            showDistanceBetweenPlayerAndLocation(shortenedDistance);

            return shortenedDistance;
        }
    }

    function showDistanceBetweenPlayerAndLocation(distance){
        if (distance == 0.00 && distance <= 0.01){
            alert("You have reached your destination")
            stopDistanceTracker();
            playerTimes.push(`${minutesSpan.innerText}:${secondsSpan.innerText}`);
            scoreSystem();
            minutesSpan.innerText = ""
            secondsSpan.innerText = ""
            colonSpan.innerText = ""
            clearInterval(window.timerMonitor)
            if (playerTimes.length === 5){
                renderEndOfGameInfo()
            }else{
                renderLocationFound()
            }
        } else if (distance > 0.01 && distance <= 0.09) {
            mapStyleID = "lopeariyo/ck5ojqkga1msi1io355h7k2so"
        }   else if (distance > 0.09 && distance <= 1.00) {
            mapStyleID = "lopeariyo/ck5ojug7b0nrq1in6l36o7xs8"
        } else if (distance > 1.00) {

            mapStyleID = "lopeariyo/ck5ojucbs1n2u1invuue79hsl"
        }
    }

    function stopDistanceTracker(){
        clearInterval(distanceMonitor)
    }

}

function trackTime(distanceMonitor){
    let totalSeconds = 0
    window.timerMonitor = setInterval(setTime, 1000);

    function setTime(){
        ++totalSeconds
        secondsSpan.innerText = pad(totalSeconds % 60);
        minutesSpan.innerText = pad(parseInt(totalSeconds / 60));
        colonSpan.innerText = ":"
    }

    function pad(val){
        let valString = val + "";
        if (valString.length < 2) {
            return "0" + valString;
        } else {
            return valString;
        }
    }
    stopTimeTracker(window.timerMonitor, distanceMonitor)

}

function stopTimeTracker(timerMonitor, distanceMonitor){
    
    let hybridMonitor = setInterval(()=>{
        if(parseInt(secondsSpan.innerText) >= 5){
            clearInterval(timerMonitor)

            if(playerTimes.length < 4){
                playerTimes.push("00:00")
                clearInterval(hybridMonitor)
                clearInterval(distanceMonitor)
                minutesSpan.innerText = ""
                secondsSpan.innerText = ""
                colonSpan.innerText = ""
                renderOutOfTimeStatus()
            }else{
                playerTimes.push("00:00")
                clearInterval(hybridMonitor)
                clearInterval(distanceMonitor)
                minutesSpan.innerText = ""
                secondsSpan.innerText = ""
                colonSpan.innerText = ""
                renderEndOfGameInfo()
            }
        }
    },1500)   
}

function getRandomLocation(){
    const locationsUrl = "http://localhost:3000/locations/"

    get(locationsUrl)
    .then(locations => Math.floor(Math.random()*(1-locations.length)+locations.length))
    .then((index) => get(`${locationsUrl}${index}`))
    // .then (location => trackDistance({latitude: location.latitude, longitude: location.longitude})) 
    trackDistance(playerCoords)
}

function scoreSystem(){
    if( parseInt(minutesSpan.innerText) < 1){
        playerScore += 10;
    }else if(( parseInt(minutesSpan.innerText) < 2)){
        playerScore += 8;
    }else if(( parseInt(minutesSpan.innerText) < 3)){
        playerScore += 6;
    }else if(( parseInt(minutesSpan.innerText) < 4)){
        playerScore += 4;
    }else{
        playerScore += 2;
    }
}

