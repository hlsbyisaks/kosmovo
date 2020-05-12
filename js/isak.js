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

function scoreboard(username) {
    WhatPageAreUserOn("scoreboard")

    $.get('php/getScore.php', {
        username: username
    })
    .done((data) => {
        data = JSON.parse(data)
        console.log(data)

        scoreArr.push([username, data[0]])


        scoreArr.forEach(element => {
            $('<div>', {
                html: element[0] + ": " + element[1][0],
                appendTo: '.scoreboard_wrapper'
            })
        });
    })
    
}