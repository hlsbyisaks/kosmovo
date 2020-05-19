 // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.


      // WHAT TO DO: TIMEOUT FOR WATCHPOSITION
      var map, infoWindow, userMarker;
      let qAr = [];
      let questions
      let enemyList = []

      let timer;
      function initMap() {

        // Try HTML5 geolocation.
        if (navigator.geolocation) {

           //CREATING MAP
          map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.5941888, lng: 55.5941888},
            zoom: 20
          });
          infoWindow = new google.maps.InfoWindow;
      

          navigator.geolocation.getCurrentPosition(function(position){
            
              var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
              };

              var icon = {
                url: 'img/profileface.svg', // url
                scaledSize: new google.maps.Size(50, 50), // scaled size
              };

              userMarker = new google.maps.Marker({
                icon: icon,
                map: map,
                title: "USER"
              })

              var infoWindow = new google.maps.InfoWindow({
                content: userInloged[0].userName + " score" + userInloged[0].userScore
              })

              userMarker.addListener('click', function() {
                infoWindow.open(map, userMarker);
              });

          })

          //UPDATE
            navigator.geolocation.watchPosition(function(position) {

            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            

            map.setCenter(pos);

            userMarker.setPosition(pos)

            $.get('php/updateCords.php', {
                lat: pos.lat,
                lng: pos.lng,
                userId: userInloged[0].userId
             })
              .done(() => {
                  console.log("updated")
                  // Print out new cords on map.
              })


            $.get('php/users.php')
                .done((data) => {
                    data = JSON.parse(data)
                    data.forEach(function (enemy) {
                        // IF USERS IS INLOGED USER DO NOTHING ELSE DO...
                        if (enemy.userId != userInloged[0].userId) {
                            // IF enemyList Dosent Contain enemy make enemy object and push in to Enemylist. We use this if someone would registrate when u already inloged.
                            let pos = {
                              lat: parseFloat(enemy.lat),
                              lng: parseFloat(enemy.lng)
                            }

                            if (!checkValue(enemy.userId, enemyList)) {

                                var icon = {
                                  url: 'img/enemyface.svg', // url
                                  scaledSize: new google.maps.Size(50, 50), // scaled size
                              };

                                var enemyPos = new google.maps.Marker({
                                  position: pos,
                                  icon: icon,
                                  map:map
                                })

                                var infoWindow = new google.maps.InfoWindow({
                                  content: enemy.userName + " score" + enemy.userScore
                                })
                    
                                enemyPos.addListener('click', function() {
                                  infoWindow.open(map, enemyPos);
                                });

                                enemyList.push({ enemyPos: enemyPos, id: enemy.userId })
                            }else{
                                // IF enemyList conatin Change enemy change update cords. 
                                enemyList.forEach((e) =>{
                                    if(e.id == enemy.userId){
                                      e.enemyPos.setPosition(pos)
                                    }
                                })
                            }
                        }
                    })
                }) 

                $.get('php/questions.php', { activite: "getAllQuestion", userId: userInloged[0].userId})
                .done((data) => {
                    for (var i = 0; i < qAr.length; i++) {
                      qAr[i].marker.setMap(null);
                      qAr[i].radius.setMap(null);
                    }


                    data = JSON.parse(data)

                    questions = data
                    data.forEach(function (quest) {
                      var qPos = {lat: parseFloat(quest.lat), lng: parseFloat(quest.long)};

                      qMark = new google.maps.Marker({
                        position: qPos,
                        map: map
                      })

                      circle = new google.maps.Circle({
                        map: map,
                        radius: 105,
                        fillColor: '#FEFCE7'
                      })
                      circle.bindTo('center', qMark, 'position');
                    
                    qAr.push({radius: circle, quest: quest, marker: qMark})
                  })

                  qAr.forEach(function(qInfo){
                    if(qInfo.radius.getBounds().contains(userMarker.position)){
                      $(".startQuestion").css({ display: "flex" })
                      $(".startQuestion").html("You Found a Question, Tap to Start")
                
                      $(".startQuestion").click(function(){
                      $.get('php/questions.php', { activite: "checkifplayed", questionID: parseInt(qInfo.quest.qId)})
                      .done((data) => {
                          console.log(data)
                          if(data == "OK"){
                              createQuestion(qInfo)
                          }else{
                              $(".startQuestion").css({ display: "flex" })
                              $(".startQuestion").html("Someone else is playing! If the other team answer wrong you can try! If the question goes away, the other team answerd correctly")
                          }
                      })
                    })
                    }else{
                      $(".startQuestion").css({ display: "none" })
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
                        QuestionFinish("RightAnswer", qInfo.quest, qInfo.marker, qInfo.radius)
                    }else{
                        QuestionFinish("WrongAnswer", qInfo.quest, qInfo.marker, qInfo.radius)
                    }
                })  
            }

            Timer()
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


function QuestionFinish(whatHappend, quest, qMarker, qRadius){

  $(".questionWrapper").css({display: "none"})
  timerStop()
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
      $.get('php/updateScore.php', {userId: userInloged[0].userId, score: quest.score})
      .done((data) =>{
        $.get('php/getPlayerScore.php', {userId: userInloged[0].userId})
        .done((data) =>{
          $(".user_score").html('Score: ' + data)
        })
      })
  }else if(whatHappend == "WrongAnswer"){
      $.get('php/userplayed.php', { activite: "insert", questionID: parseInt(quest.qId), userId: userInloged[0].userId, correct: 0})
      .done((data) =>{

      })
      console.log("Wrong Answer")
  }

  qMarker.setMap(null)
  qRadius.setMap(null)


  //MAKE QUESTION + CIRCLE VISIBLE FALSE -> GET.BOUNDS() SET THEN TO FALSE! ( I THINK <3 )

  $.get('php/questions.php', { activite: "isNotPlaying", questionID: parseInt(quest.qId)})
      .done((data) =>{

  })
}

let sec = 30;
function Timer(){
  $(".questionTimer").html(sec)
  timer = setInterval(timerPulse, 1000)
}

function timerPulse(){
  sec = sec - 1
  $(".questionTimer").html(sec)
  if(sec <= 0){
    timerStop()
    $(".questionTimer").removeClass("questionTimerShake")
  }else if(sec <= 10){
    $(".questionTimer").addClass("questionTimerShake")
  }
}

function timerStop(){
  clearInterval(timer)
  sec = 30;
}













