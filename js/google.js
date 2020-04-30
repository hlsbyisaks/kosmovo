 // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.
      var map, infoWindow, userMarker;
      function initMap() {

        //CREATING MAP
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: 55.5941888, lng: 55.5941888},
          zoom: 20
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {

            $.get('php/questions.php', { activite: "getAllQuestion", userId: userInloged[0].userId})
                .done((data) => {
                    data = JSON.parse(data)

                    data.forEach(function (quest) {
                        var qPos = {lat: parseFloat(quest.lat), lng: parseFloat(quest.long)};

                        let qMark = new google.maps.Marker({
                            position: qPos,
                            map: map
                        })

                        let circle = new google.maps.Circle({
                            map: map,
                            radius: 10,
                            fillColor: '#AA0000'
                        })
                        circle.bindTo('center', qMark, 'position');
                        })
                    
                })

          // PLACE ONE TIME
          navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            map.setCenter(pos);

            userMarker = new google.maps.Marker({
              position: pos,
              map: map,
              title: "USER"
            })

            

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });


          //UPDATE
          navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            userMarker.setPosition(pos)


          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }