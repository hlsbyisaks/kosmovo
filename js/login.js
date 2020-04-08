loginPage()

function login() {
    navigator.geolocation.getCurrentPosition(function(location) {
        if ($('#username').val() && $('#password').val()) {
            let username = $('#username').val()
            let password = $('#password').val()

            $.get('php/login.php', {
                username: username,
                password: password,
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            .done((data) => {
                data = JSON.parse(data)
                console.log(data)

                if (data[0] != undefined) {
                    console.log('Login success, userId: ' + data[0].userId + ' username: ' + data[0].userName)
                    WhatPageAreUserOn("game", data[0].userId, data[0].userName)

                    /* send to game page with userId = data[0].userId
                    Set cookie login=true and userid */

                } else {
                    prompt('Username and password does not match')
                }
            })
        } else {
            prompt('Please fill both forms')
        }
    })
}


/* Elements */
function loginPage() {
    $('#login_page').html('')

    $("<div>", {
        'id': 'loginContainer',
        appendTo:'#login_page'
    })

    $("<div>", {
        'id': 'logo',
        appendTo:'#loginContainer'
    }).css({'background-image': 'url(img/logo.png)', 'height': '150px', 'background-size': 'contain'})
    
    $("<input>", {
        'id': 'username',
        placeholder: 'Username',
        type:'text',
        appendTo:'#loginContainer'
    })
    
    $("<input>", {
        'id': 'password',
        placeholder: 'Password',
        type:'password',
        appendTo:'#loginContainer'
    })
    
    $("<input>", {
        value: 'Login',
        class: 'button',
        'id': 'login',
        type:'button',
        appendTo:'#loginContainer',
    }).click(login)
    
    $("<input>", {
        value: 'Register',
        class: 'button',
        'id': 'register',
        type:'button',
        appendTo:'#loginContainer',
    }).click(registerPage)
}