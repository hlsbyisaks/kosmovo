//HEADER // MOVE TO google.js

$("<div>", {
    html: 'KOSMOVO',
    appendTo:'.logoContainer > div'
}).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '20px', 'margin-top': '6.75px', 'text-align': 'center'})

$("<div>", {
    html: '2020',
    appendTo:'.logoContainer > div'
}).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '39px',
         'margin-top': '-13.5px', 'text-align': 'center'})

/* $("<div>", {
    'id': 'logo',
    appendTo:'.logoContainer'
}).css({'background-image': 'url(img/logo.png)', 'height': '47px', "width": "45px",
        'background-size': 'cover', 'background-repeat': 'no-repeat'}) */





//SCOREBOARD

let scoreArr = []

$('.score_button').click(scoreboard)

function backToGame() {
    WhatPageAreUserOn("game")
}

function scoreboard() {
    WhatPageAreUserOn("scoreboard")

    $.get('php/getScore.php', {
    })
    .done((data) => {
        data = JSON.parse(data)
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