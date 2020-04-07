let questions = []

navigator.geolocation.getCurrentPosition(function(location) {
          var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);
          var CurrentPos = latlng;

          var mymap = L.map('map').setView(latlng, 13)
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
          }).addTo(mymap);
    // THIS IS LOCATION BASED
    var user = L.marker(new L.LatLng(location.coords.latitude,location.coords.longitude)).addTo(mymap); 

    //var user = L.marker(new L.LatLng(55.60068880000021,12.998035199999979)).addTo(mymap);
    
     $.get('php/questions.php', {activite: "getAllQuestion" })
        .done((data) => {
            data = JSON.parse(data)
            
         
            data.forEach(function(quest){
                console.log(quest)
                let question = L.marker(new L.LatLng(parseFloat(quest.lat), parseFloat(quest.long))).addTo(mymap);
                let radius = L.circle(new L.LatLng(parseFloat(quest.lat), parseFloat(quest.long)), 10).addTo(mymap);
                questions.push({quest, questionCord: question, radiusCord: radius})
            })
        })
    
        
    
//SIMUALTION OF WALKING    
    
$(document).keydown(function(e){
    switch (e.which){
    case 37:    //left arrow key
        user._latlng.lng -= 0.0001;
        user.setLatLng(user._latlng)
        checkIfQuestionHit()
        break;
    case 38:    //up arrow key
        user._latlng.lat += 0.0001;
        user.setLatLng(user._latlng)
        checkIfQuestionHit()
        break;
    case 39:    //right arrow key
        user._latlng.lng += 0.0001;
        user.setLatLng(user._latlng)
        checkIfQuestionHit()
        break;
    case 40:    //bottom arrow key
        user._latlng.lat -= 0.0001;
        user.setLatLng(user._latlng)
        checkIfQuestionHit()
        break;
    }
    
//UPDATE PLAYERMOVMENT  
    /*
setInterval(function(){
    user._latlng = new L.LatLng(location.coords.latitude,location.coords.longitude)
},1000)
});
*/
    function getUsers(){
         $.get('php/users.php')
            .done((data) => {
                data = JSON.parse(data)
             console.log(data)
                
                data.forEach(function(enemy){
                    let enemyName = enemy.userName
                    var enemy = L.marker(new L.LatLng(enemy.lat,enemy.lng)).addTo(mymap).on('click', function() {
                        console.log(enemyName);
                    });
                })
            })
    }
    getUsers()
    
    
    function checkIfQuestionHit(){
        for(let i = 0; i < questions.length; i++){
            if (user.getLatLng().distanceTo(questions[i].radiusCord.getLatLng()) <= questions[i].radiusCord.getRadius()) {
                console.log(questions[i].quest.qString);
                $(".startQuestion").css({display: "flex"})
                createQuestion(questions[i])
                break;
            }else{
                    $(".startQuestion").css({display: "none"})
            }
        }
    }
    
    function createQuestion(q){
        	
        $( ".startQuestion").unbind( "click" ).click(function(){
            console.log(q.quest.alt1)
        })
    }
    
    
       
    
    
});
})
