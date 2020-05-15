//HEADER // MOVE TO google.js

$("<div>", {
    html: 'KOSMOVO',
    appendTo:'.logoContainer > div'
}).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '30px', 'text-align': 'center'})

/* $("<div>", {
    html: '2020',
    appendTo:'.logoContainer > div'
}).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '39px',
         'margin-top': '-13.5px', 'text-align': 'center'}) */

/* $("<div>", {
    'id': 'logo',
    appendTo:'.logoContainer'
}).css({'background-image': 'url(img/logo.png)', 'height': '47px', "width": "45px",
        'background-size': 'cover', 'background-repeat': 'no-repeat'}) */



function backToGame() {
    WhatPageAreUserOn("game")
}


//SCOREBOARD

let scoreArr = []

$('.score_button').click(scoreboard)


function scoreboard() {
    WhatPageAreUserOn("scoreboard")

    $.get('php/getScore.php', {
    })
    .done((data) => {
        data = JSON.parse(data)
        data = data.sort(compareIndexFound);
        console.log(data)
        $('.scoreboard_wrapper').html('')

        $('<div>', {
            html: 'Ladder',
            appendTo: '.scoreboard_wrapper',
            'class': 'scoreboard_item'
        })

        data.forEach(element => {
            $('<div>', {
                html: element.userName + ": " + element.userScore,
                appendTo: '.scoreboard_wrapper',
                'class': 'scoreboard_item'
            }).click(function(e){
                $.get('php/userCords.php', { userId: element.userId})
                .done((data) =>{
                    data = JSON.parse(data)
                    var pos = {
                        lat: parseFloat(data[0].lat),
                        lng: parseFloat(data[0].lng),
                      };
                      backToGame()
                      map.setZoom(16)
                      map.panTo(pos)
                      

                    
                })
            })
        });


        $("<input>", {
            value: 'Back',
            class: 'button',
            type:'button',
            appendTo:'.scoreboard_wrapper',
        }).click(backToGame)
    })
}

function compareIndexFound(a, b) {
    if (parseInt(a.userScore) < parseInt(b.userScore)) { return 1; }
    if (parseInt(a.userScore) > parseInt(b.userScore)) { return -1; }
    return 0;
  }


  
