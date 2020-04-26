let questions = []
let enemyList = []
let played

let updatingInterval;

let timer;

function map() {
    navigator.geolocation.getCurrentPosition(function (location) {
        var latlng = new L.LatLng(location.coords.latitude, location.coords.longitude);

        var mymap = L.map('map').setView(latlng, 13)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://mapbox.com">Mapbox</a>',
            maxZoom: 18,
            id: 'mapbox.streets',
            accessToken: 'pk.eyJ1IjoiYmJyb29rMTU0IiwiYSI6ImNpcXN3dnJrdDAwMGNmd250bjhvZXpnbWsifQ.Nf9Zkfchos577IanoKMoYQ'
        }).addTo(mymap);
        // THIS IS LOCATION BASED
        //var user = L.marker(new L.LatLng(location.coords.latitude, location.coords.longitude)).addTo(mymap);

       // var user = L.marker(new L.LatLng(userInloged[0].lat, userInloged[0].lng)).addTo(mymap);
        var user = L.marker(new L.LatLng(location.coords.latitude, location.coords.longitude)).addTo(mymap);

        // GET ALL QUESTION AND DISPLAY THEM

        $.get('php/questions.php', { activite: "getAllQuestion", userId: userInloged[0].userId })
            .done((data) => {
                data = JSON.parse(data)
                console.log(data)


                data.forEach(function (quest) {
                    console.log(quest)
                    let question = L.marker(new L.LatLng(parseFloat(quest.lat), parseFloat(quest.long))).addTo(mymap);
                    let radius = L.circle(new L.LatLng(parseFloat(quest.lat), parseFloat(quest.long)), 2000).addTo(mymap);
                    questions.push({ quest, questionCord: question, radiusCord: radius })
                })
            })



        //SIMUALTION OF WALKING    

        $(document).keydown(function (e) {
            switch (e.which) {
                case 37:    //left arrow key
                    userInloged[0].lng -= 0.001 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
                case 38:    //up arrow key
                    userInloged[0].lat += 0.001 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
                case 39:    //right arrow key
                    userInloged[0].lng += 0.001 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
                case 40:    //bottom arrow key
                    userInloged[0].lat -= 0.001 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
            }
        })


        // FUNCTION THAT DISPLAY ENEMYS ON MAP
        function getEnemys() {
            // GET ALL USERS
            $.get('php/users.php')
                .done((data) => {
                    data = JSON.parse(data)
                    console.log(data)

                    data.forEach(function (enemy) {
                        // IF USERS IS INLOGED USER DO NOTHING ELSE DO...
                        if (enemy.userId != userInloged[0].userId) {
                            // IF enemyList Dosent Contain enemy make enemy object and push in to Enemylist. We use this if someone would registrate when u already inloged.
                            if (!checkValue(enemy.userId, enemyList)) {
                                let enemyName = enemy.userName
                                console.log(enemy)
                                var enemy_object = L.marker(new L.LatLng(parseFloat(enemy.lat), parseFloat(enemy.lng))).addTo(mymap).on('click', function () {
                                    console.log(enemyName);
                                });
                                enemyList.push({ print: enemy_object, id: enemy.userId })
                            }else{
                                // IF enemyList conatin Change enemy change update cords. 
                                enemyList.forEach((e) =>{
                                    if(e.id == enemy.userId){
                                        e.print.setLatLng([parseFloat(enemy.lat), parseFloat(enemy.lng)])
                                    }
                                })
                            }
                        }
                    })
                })
        }


        // FUNCTION THAT CHECK IF SOMETHING IS IN ARRAY
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


        // If User is in radius of X question.
        function checkIfQuestionHit() {

            //MAKE PLAY TO YES IN DB
            for (let i = 0; i < questions.length; i++) {
                if (user.getLatLng().distanceTo(questions[i].radiusCord.getLatLng()) <= questions[i].radiusCord.getRadius()) {

                    console.log(questions[i].quest.qId)
                    $.get('php/questions.php', { activite: "checkifplayed", questionID: parseInt(questions[i].quest.qId)})
                    .done((data) => {
                        console.log(data)
                        if(data == "OK"){
                            $(".startQuestion").css({ display: "flex" }).html("You Found a Question, Tap to Start")
                            createQuestion(questions[i].quest)
                        }else{
                            $(".startQuestion").css({ display: "flex" }).html("Someone is Playing Right Now!")
                        }
                    })
                } else {
                    $(".startQuestion").css({ display: "none" })
                }
            }
        }

        function createQuestion(q) {
            $(".startQuestion").unbind("click").click(function () {             
                $(".startQuestion").css({display: "none"})
                $(".questionWrapper").css({display: "flex"})

                $(".questionText").html(q.qString)

                let questionAlt = []
                questionAlt.push(q.alt1, q.alt2, q.alt3, q.alt4)
                questionAlt = shuffle(questionAlt)
                console.log(questionAlt)

                for(let i = 0; i < 4; i++){
                    console.log(questionAlt[i])
                    $("<div>",{
                        "html": questionAlt[i],
                        appendTo: ".questionAnswer"
                    }).click(function(){
                        if(this.innerHTML == q.alt1){
                            console.log("YES")
                            QuestionFinish("RightAnswer", q.score)
                        }else{
                            console.log("NO")
                            QuestionFinish("WrongAnswer")
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
                    QuestionFinish("noTime")
                }
            },1000*sec/100)

        }

        function QuestionFinish(whatHappend, score){
            $(".questionWrapper").css({display: "none"})
            clearInterval(timer)

            if(whatHappend == "noTime"){
                console.log("NO TIME")
            }else if(whatHappend == "RightAnswer"){
                console.log("Right Answer")
                console.log("You earned " + score)
            }else if(whatHappend == "WrongAnswer"){
                console.log("Wrong Answer")
            }
        }

        // Update Cords of inloged user and upload to DB.
        function UpdateCord() {
                $.get('php/updateCords.php', {
                    lat: userInloged[0].lat,
                    lng: userInloged[0].lng,
                    userId: userInloged[0].userId
                })
                    .done(() => {
                        console.log("updated")
                        // Print out new cords on map.
                        user.setLatLng([userInloged[0].lat, userInloged[0].lng])
                    })
        }


        /* updatingInterval = setInterval(function(){
            getEnemys()
            UpdateCord()
        },5000) */
    })
}






