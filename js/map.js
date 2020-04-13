let questions = []
let enemyList = []

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

        var user = L.marker(new L.LatLng(userInloged[0].lat, userInloged[0].lng)).addTo(mymap);

        $.get('php/questions.php', { activite: "getAllQuestion" })
            .done((data) => {
                data = JSON.parse(data)


                data.forEach(function (quest) {
                    console.log(quest)
                    let question = L.marker(new L.LatLng(parseFloat(quest.lat), parseFloat(quest.long))).addTo(mymap);
                    let radius = L.circle(new L.LatLng(parseFloat(quest.lat), parseFloat(quest.long)), 10).addTo(mymap);
                    questions.push({ quest, questionCord: question, radiusCord: radius })
                })
            })



        //SIMUALTION OF WALKING    

        $(document).keydown(function (e) {
            switch (e.which) {
                case 37:    //left arrow key
                    userInloged[0].lng -= 1 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
                case 38:    //up arrow key
                    userInloged[0].lat += 1 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
                case 39:    //right arrow key
                    userInloged[0].lng += 1 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
                case 40:    //bottom arrow key
                    userInloged[0].lat -= 1 ;
                    UpdateCord("user")
                    checkIfQuestionHit()
                    break;
            }
            getUsers()
        })


        function getUsers() {
            $.get('php/users.php')
                .done((data) => {
                    data = JSON.parse(data)
                    console.log(data)

                    data.forEach(function (enemy) {
                        if (enemy.userId != userInloged[0].userId) {
                            if (!checkValue(enemy.userId, enemyList)) {
                                let enemyName = enemy.userName
                                console.log(enemy)
                                var enemy_object = L.marker(new L.LatLng(parseFloat(enemy.lat), parseFloat(enemy.lng))).addTo(mymap).on('click', function () {
                                    console.log(enemyName);
                                });
                                enemyList.push({ print: enemy_object, id: enemy.userId })
                            }else{
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

        function checkIfQuestionHit() {
            for (let i = 0; i < questions.length; i++) {
                if (user.getLatLng().distanceTo(questions[i].radiusCord.getLatLng()) <= questions[i].radiusCord.getRadius()) {
                    console.log(questions[i].quest.qString);
                    $(".startQuestion").css({ display: "flex" })
                    createQuestion(questions[i])
                    break;
                } else {
                    $(".startQuestion").css({ display: "none" })
                }
            }
        }

        function createQuestion(q) {

            $(".startQuestion").unbind("click").click(function () {
                console.log(q.quest.alt1)
            })
        }

        function UpdateCord(who) {
                $.get('php/updateCords.php', {
                    lat: userInloged[0].lat,
                    lng: userInloged[0].lng,
                    userId: userInloged[0].userId
                })
                    .done(() => {
                        console.log("updated")
                        user.setLatLng([userInloged[0].lat, userInloged[0].lng])
                    })
        }
    })
}






