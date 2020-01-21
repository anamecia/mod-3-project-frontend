
function distanceMonitorFunction(){

    let distanceMonitor = setInterval(
    () => findDistanceBetweenPlayerAndLocation(playerCoords, chiswellStreet), 5000);

    renderTimer(distanceMonitor)
    
    function findDistanceBetweenPlayerAndLocation (p1, p2){

        if (!p1 || !p2) {
            return 0.00;
        } else if (p1.latitude == p2.latitude && p1.longitude == p2.longitude) {
            showDistanceBetweenPlayerAndLocation(0.00);
            return 0.00; 
        } else {
            var radlat1 = (Math.PI * p1.latitude) / 180;
            var radlat2 = (Math.PI * p2.latitude) / 180;
            var theta = p1.longitude- p2.longitude;
            var radtheta = (Math.PI * theta) / 180;
            var dist =
                Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta)

            if (dist > 1) {
                dist = 1;
            }

            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            dist = (dist * 1.609344);

            showDistanceBetweenPlayerAndLocation(dist);

            return dist.toFixed(2);
        }
    }

    function showDistanceBetweenPlayerAndLocation(distance){
        if (distance != 0.00){
            alert("You are " + distance.toFixed(2) + " km away from your location");
        } else {
            alert("You have reached your destination")
            clearInterval(distanceMonitor)
        }
    }

}