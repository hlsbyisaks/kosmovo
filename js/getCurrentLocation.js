let user_lat
let user_lng

function getLocation() {
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
        } else {
            alert("Geolocation is not supported by this browser.");
        }
}

function geoSuccess(position) {
    user_lat = position.coords.latitude;
    user_lng = position.coords.longitude;
}

function geoError() {
    alert("Geocoder failed.");
}

getLocation()