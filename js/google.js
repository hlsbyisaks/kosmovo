 // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.


      // WHAT TO DO: TIMEOUT FOR WATCHPOSITION
      var map, infoWindow, userMarker;
      let qAr = [];
      let enemyList = []

      let timer;
      function initMap() {

        //CREATING MAP
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 20
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {

          // PLACE ONE TIME
          navigator.geolocation.getCurrentPosition(function(position) {

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            map.setCenter(pos);

            userMarker= new google.maps.Marker({
              position: pos,
              map: map,
              title: "USER"
            })
        

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });

           //PLACE OUT QUESTIONS
           $.get('php/questions.php', { activite: "getAllQuestion", userId: userInloged[0].userId})
           .done((data) => {
               data = JSON.parse(data)

               data.forEach(function (quest) {
                 var qPos = {lat: parseFloat(quest.lat), lng: parseFloat(quest.long)};

                 qMark = new google.maps.Marker({
                   position: qPos,
                   map: map
                 })

                 circle = new google.maps.Circle({
                   map: map,
                   radius: 10,
                   fillColor: '#AA0000'
                 })
                 circle.bindTo('center', qMark, 'position');
                 
                 qAr.push({radius: circle, quest: quest, marker: qMark})
               })
         })


          //UPDATE
          navigator.geolocation.watchPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            userMarker.setPosition(pos)


            qAr.forEach(function(qInfo){
              if(qInfo.radius.getBounds().contains(userMarker.position)){
                   
                $.get('php/questions.php', { activite: "checkifplayed", questionID: parseInt(qInfo.quest.qId)})
                .done((data) => {
                    console.log(data)
                    if(data == "OK"){
                        $(".startQuestion").css({ display: "flex" }).html("You Found a Question, Tap to Start")
                        createQuestion(qInfo)
                        console.log(qInfo)
                    }else{
                        $(".startQuestion").css({ display: "flex" }).html("Someone is Playing Right Now!")
                    }
                })
              }else{
                $(".startQuestion").css({ display: "none" })
              }
            })


            $.get('php/users.php')
                .done((data) => {
                    data = JSON.parse(data)
                    data.forEach(function (enemy) {
                        // IF USERS IS INLOGED USER DO NOTHING ELSE DO...
                        if (enemy.userId != userInloged[0].userId) {
                            // IF enemyList Dosent Contain enemy make enemy object and push in to Enemylist. We use this if someone would registrate when u already inloged.
                            if (!checkValue(enemy.userId, enemyList.id)) {
                                var enemyPos = {
                                  lat: parseFloat(enemy.lat),
                                  lng: parseFloat(enemy.long),
                                  map:map
                                }
                                enemyList.push({ enemyPos: enemyPos, id: enemy.userId })
                            }else{
                                // IF enemyList conatin Change enemy change update cords. 
                                enemyList.forEach((e) =>{
                                    if(e.id == enemy.userId){
                                        e.enemyPos.setPosition(enemyPos)
                                    }
                                })
                            }
                        }
                    })
                })

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





function checkValue(value, arr) {
    var exist = false;

    for (var i = 0; i < arr.length; i++) {
    var name = arr[i].id;
    if (name == value) {
    exist = true;
              break;
          }
      }

      return exist;
}

function createQuestion(qInfo) {
        $(".startQuestion").unbind("click").click(function () {
            
            $.get('php/questions.php', { activite: "isPlaying", questionID: parseInt(qInfo.quest.qId)})
                .done((data) =>{

                })

            $(".startQuestion").css({display: "none"})
            $(".questionWrapper").css({display: "flex"})

            $(".questionText").html(qInfo.quest.qString)

            let questionAlt = []
            questionAlt.push(qInfo.quest.alt1, qInfo.quest.alt2, qInfo.quest.alt3, qInfo.quest.alt4)
            questionAlt = shuffle(questionAlt)
            console.log(questionAlt)

            // CLEAR BOX
            $(".questionAnswer").html("")
            for(let i = 0; i < 4; i++){
                console.log(questionAlt[i])
                $("<div>",{
                    "html": questionAlt[i],
                    appendTo: ".questionAnswer"
                }).click(function(){
                    if(this.innerHTML == qInfo.quest.alt1){
                        console.log("YES")
                        QuestionFinish("RightAnswer", qInfo.quest, qInfo.marker, qInfo.radius)
                    }else{
                        console.log("NO")
                        QuestionFinish("WrongAnswer", qInfo.quest, qInfo.marker, qInfo.radius)
                    }
                })
                
            }

            startQuestionTimer()  
        })
}

function shuffle(a) {
      var j, x, i;
      for (i = a.length - 1; i > 0; i--) {
          j = Math.floor(Math.random() * (i + 1));
          x = a[i];
          a[i] = a[j];
          a[j] = x;
      }
      return a;
}

function startQuestionTimer(){
    let sec = 60;

    let fullBar = 100;

    timer = setInterval(function(){
        if(fullBar >= 0){
            fullBar -= 1
            $(".TimeLeft").css({width: fullBar + "%"})
        }else{
            clearInterval(timer)
            QuestionFinish("noTime", q)
        }
    },1000*sec/100)

}

function QuestionFinish(whatHappend, quest, qMarker, qRadius){
  $(".questionWrapper").css({display: "none"})
  clearInterval(timer)
  console.log(quest)
  if(whatHappend == "noTime"){
      $.get('php/userplayed.php', { activite: "insert", questionID: parseInt(quest.qId), userId: userInloged[0].userId, correct: 0})
      .done((data) =>{

      })
      console.log("NO TIME")
  }else if(whatHappend == "RightAnswer"){
      $.get('php/userplayed.php', { activite: "insert", questionID: parseInt(quest.qId), userId: userInloged[0].userId, correct: 1})
      .done((data) =>{

      })
  }else if(whatHappend == "WrongAnswer"){
      $.get('php/userplayed.php', { activite: "insert", questionID: parseInt(quest.qId), userId: userInloged[0].userId, correct: 0})
      .done((data) =>{

      })
      console.log("Wrong Answer")
  }

  qRadius.setMap(null)
  qMarker.setMap(null)
  console.log(qRadius)

  $.get('php/questions.php', { activite: "isNotPlaying", questionID: parseInt(quest.qId)})
      .done((data) =>{

  })
}
