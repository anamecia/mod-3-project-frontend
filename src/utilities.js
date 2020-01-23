function trackDistance(locationCoordinates){
    
    let distanceMonitor = setInterval(
    () => findDistanceBetweenPlayerAndLocation(playerCoords, locationCoordinates), 3000);


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
        
    
            if (distance == 0.00 && distance <= 0.02){
                distanceClue = "You found it!!!!!"
                showDistanceClue(distanceClue)
                compassMapStyleID = "lopeariyo/ck5qjrkxu1wvr1ip8eg2jetse" //green map
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
            } else if (distance > 0.02 && distance <= 0.06) {
                distanceClue = "Hot Hot!"
                showDistanceClue(distanceClue)  
                compassMapStyleID = "lopeariyo/ck5ojqkga1msi1io355h7k2so" //red 1
            }   else if (distance > 0.06 && distance <= 0.12) {
                compassMapStyleID = "lopeariyo/ck5qpp5dt0su31imsgbp2cocq" //red 2
                distanceClue = "On it like a scotch bonnet!"
                showDistanceClue(distanceClue) 
            } else if (distance > 0.12 && distance <= 0.20) {
                compassMapStyleID = "lopeariyo/ck5qpowi4225v1ilcssdzehns" //purple 1
                distanceClue = "Getting hotter, looks like you don't need a blanket anymore!"
                showDistanceClue(distanceClue)
            } else if (distance > 0.20 && distance <= 0.36) {
                compassMapStyleID = "lopeariyo/ck5ojug7b0nrq1in6l36o7xs8" // purple 2
                distanceClue = "Getting warmer, you still need a blanket though!"
                showDistanceClue(distanceClue)
            } else if (distance > 0.36 && distance <= 0.68) {
                compassMapStyleID = "lopeariyo/ck5ojucbs1n2u1invuue79hsl"// blue 1
                distanceClue = "Brrrr... cold!"
                showDistanceClue(distanceClue)
            } else if (distance > 0.68 ) {
                compassMapStyleID = "lopeariyo/k5qpp1bs0su21imsxp6dq29l" // blue 2
                distanceClue = "Freezing... Game over!" 
                showDistanceClue(distanceClue)
            } 
    }

    function showDistanceClue(string){
        modalContainer.classList.remove("hidden")
        distanceClueDisplay.innerText = string
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
                playerTimes.push(`${minutesSpan.innerText}:${secondsSpan.innerText}`)
                clearInterval(hybridMonitor)
                clearInterval(distanceMonitor)
                minutesSpan.innerText = ""
                secondsSpan.innerText = ""
                colonSpan.innerText = ""
                renderOutOfTimeStatus()
            }else{
                playerTimes.push(`${minutesSpan.innerText}:${secondsSpan.innerText}`)
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

function getRandomIndex(){

    get(locationsUrl)
    .then(locations => Math.floor(Math.random()*(1-locations.length)+locations.length))
    .then((index) => getRandomLocation(index)) 
    
}

function getRandomLocation(index){
    
    get(`${locationsUrl}${index}`)
    .then(location => helperFunction(location)) 
}

function helperFunction(location){
    trackDistance({latitude: location.latitude, longitude: location.longitude})
    // trackDistance(playerCoords)
    clue.innerText = location.clue
}

function scoreSystem(){
    if( parseInt(minutesSpan.innerText) < 1 || minutesSpan.innerText === ""){
        playerScore += 10;
    }else if(( parseInt(minutesSpan.innerText) < 2)){
        playerScore += 8;
    }else if(( parseInt(minutesSpan.innerText) < 3)){
        playerScore += 6;
    }else if(( parseInt(minutesSpan.innerText) < 4) ){
        playerScore += 4;
    }else{
        playerScore += 2;
    }
}

