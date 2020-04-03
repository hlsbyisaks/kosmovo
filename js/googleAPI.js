var map;
var userPos
function initMap() {
  //Map - Malmö
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 55.597522, lng: 13.016858},
    zoom: 15
  });

  //Map - Market

  var marker = new google.maps.Marker({
    position:{lat: 55.597522, lng: 13.016858},
    map:map
  })

  var circle = new google.maps.Circle({
    map: map,
    radius: 10,    // 10 miles in metres
    fillColor: '#311B42'
  });
  circle.bindTo('center', marker, 'position')


  // USER MARKER
 
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      userPos = new google.maps.Marker({
        position:{lat: position.coords.latitude, lng: position.coords.longitude},
        map:map
      })
      setInterval(function(){
        userPos.position.lat = position.coords.latitude;
        userPos.position.lng = position.coords.longitude;
      },1000)
      var circle = new google.maps.Circle({
        map: map,
        radius: 10,    // 10 miles in metres
        fillColor: '#311B42'
      });
      circle.bindTo('center', userPos, 'position')
    }, function() {
      handleLocationError(true, userPos, map.getCenter());
    });
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, userPos, map.getCenter());
  }

  var infowindow = new google.maps.InfoWindow({
    content: "Kapten SvartSkägg frågor"
  });


  marker.addListener('click', function(){
    infowindow.open(map, marker)
  })

};



