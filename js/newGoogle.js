var map, infoWindow, userMarker, pos
let firstTimeLoadingQuestion = true;
let enemyList = []

let qAr = []


function initMap() {

    if (navigator.geolocation) {

        map = new google.maps.Map(document.getElementById('map'), {
            center: {lat: 55.5941888, lng: 55.5941888},
            zoom: 20
          });
          infoWindow = new google.maps.InfoWindow;

    

    navigator.geolocation.getCurrentPosition(function(position){ 

          pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
          }

        var icon = {
            url: 'img/profileface.svg', // url
            scaledSize: new google.maps.Size(50, 50), // scaled size
          };


          userMarker = new google.maps.Marker({
            icon: icon,
            map: map,
            pos: pos,
            title: "USER"
          })

          var infoWindow = new google.maps.InfoWindow({
            content: userInloged[0].userName + " score" + userInloged[0].userScore
          })

          userMarker.addListener('click', function() {
            infoWindow.open(map, userMarker);
          });

          userMarker.setPosition(pos)
          map.setCenter(pos);

    })

    navigator.geolocation.watchPosition(function(position){
        pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        userMarker.setPosition(pos)
    })



      setInterval(() => {
          updateUser()
          getEnemy()
          placeQuestion()
      }, 5000)
  }
}


function getEnemy(){
  let highestScore, myScore
  
  $.get("php/getHighestscore.php")
        .done((data) =>{
          data = JSON.parse(data)
          highestScore = data[0].userScore
          $.get("php/getPlayerScore.php", {userId: userInloged[0].userId})
          .done((data) =>{
            data = JSON.parse(data)
            myScore = data[0].userScore
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

                              enemyList.push({ enemyPos: enemyPos, id: enemy.userId, score: enemy.userScore })
                          }else{                 
                                  enemyList.forEach((e) =>{

                                    var icon = {
                                      url: "",
                                      scaledSize: new google.maps.Size(50, 50), // scaled size
                                    };

                                    if(e.id == enemy.userId){
                                      e.enemyPos.setPosition(pos)
                                      e.score = enemy.userScore
                                      if(myScore != highestScore){
                                        icon.url = 'img/profileface.svg'
                                        userMarker.setIcon(icon)
                                        if(e.score == highestScore){
                                          icon.url = 'img/enemyfaceWIN.svg'
                                          e.enemyPos.setIcon(icon)
                                        }else{
                                          icon.url = 'img/enemyface.svg'
                                          e.enemyPos.setIcon(icon)
                                        }
                                      }else{
                                        icon.url = 'img/profilefaceWIN.svg'
                                        userMarker.setIcon(icon)
                                        icon.url = 'img/enemyface.svg'
                                        e.enemyPos.setIcon(icon)
                                      }
                                    }
                                  })                  
                            
                          }
                      }
                  })
              })
    
          })
  })

  

}

function updateUser(){
      
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

}


function placeQuestion(){
    $.get('php/questions.php', { activite: "getAllQuestion", userId: userInloged[0].userId})
    .done((data) => {

            if(!firstTimeLoadingQuestion){
                for (var i = 0; i < qAr.length; i++) {
                    qAr[i].marker.setMap(null);
                    qAr[i].radius.setMap(null);
                }
            }
            qAr = []

            firstTimeLoadingQuestion = false;


            data = JSON.parse(data)

            data.forEach(function (quest) {
            var qPos = {lat: parseFloat(quest.lat), lng: parseFloat(quest.long)};

            qMark = new google.maps.Marker({
                position: qPos,
                map: map
            })

            var codeWindow = new google.maps.InfoWindow({
              content: quest.code
            })
  
            qMark.addListener('click', function() {
              codeWindow.open(map, this);
            });


            circle = new google.maps.Circle({
                map: map,
                radius: 10,
                fillColor: '#DC2521'
            })
            circle.bindTo('center', qMark, 'position');
            
            qAr.push({radius: circle, quest: quest, marker: qMark})
        })

    })
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


function createQuestion(quest) {
  
  $("#scanButtonWrapper").css({display: "none"})
  $.get('php/questions.php', { activite: "isPlaying", questionID: parseInt(quest.qId)})
      .done((data) =>{

      })

  $(".startQuestion").css({display: "none"})
  $(".questionWrapper").css({display: "flex"})

  $(".questionText").html(quest.qString)

  let questionAlt = []
  questionAlt.push(quest.alt1, quest.alt2, quest.alt3, quest.alt4)
  questionAlt = shuffle(questionAlt)

  // CLEAR BOX
  $(".questionAnswer").html("")
  for(let i = 0; i < 4; i++){
      console.log(questionAlt[i])
      $("<div>",{
          "html": questionAlt[i],
          appendTo: ".questionAnswer"
      }).click(function(){
          if(this.innerHTML == quest.alt1){
              QuestionFinish("RightAnswer", quest)
              alert("Correct Answer, You Earned " + quest.score)
          }else{
              QuestionFinish("WrongAnswer", quest)
              alert("Wrong Answer")
          }
      })  
  }

}


function QuestionFinish(whatHappend, quest){

  $(".questionWrapper").css({display: "none"})
  $("#scanButtonWrapper").css({display: "flex"})
  $("#scanWrapper").css({display: "flex"})
  $("#scanButtonWrapper").click()

  if(whatHappend == "RightAnswer"){
      $.get('php/userplayed.php', { activite: "insert", questionID: parseInt(quest.qId), userId: userInloged[0].userId, correct: 1})
      .done((data) =>{
        $.get('php/updateScore.php', {userId: userInloged[0].userId, score: quest.score})
          .done((data) =>{
            $.get('php/getPlayerScore.php', {userId: userInloged[0].userId})
              .done((data) =>{
                data = JSON.parse(data)
               $(".user_score").html('Score: ' + data[0].userScore)
            })
          })
      })
      
  }else if(whatHappend == "WrongAnswer"){
      $.get('php/userplayed.php', { activite: "insert", questionID: parseInt(quest.qId), userId: userInloged[0].userId, correct: 0})
      .done((data) =>{
        $.get('php/updateScore.php', {userId: userInloged[0].userId, score: 30})
          .done((data) =>{
            $.get('php/getPlayerScore.php', {userId: userInloged[0].userId})
              .done((data) =>{
                data = JSON.parse(data)
               $(".user_score").html('Score: ' + data[0].userScore)
            })
          })

      })
      console.log("Wrong Answer")

  }


  //MAKE QUESTION + CIRCLE VISIBLE FALSE -> GET.BOUNDS() SET THEN TO FALSE! ( I THINK <3 )

  $.get('php/questions.php', { activite: "isNotPlaying", questionID: parseInt(quest.qId)})
      .done((data) =>{
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