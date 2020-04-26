let userInloged;
let encPassword

// LOGIN IF COOKIE SAVED

if(document.cookie.length > 0){
    let cookie = document.cookie.split(",")
    $.get('php/login.php', {
        username: cookie[0],
        password: cookie[1]
    })
    .done((data) =>{
        data = JSON.parse(data)
        userInloged = data
        WhatPageAreUserOn("game", data[0].userId, data[0].userName)
        map()
    })
}else{
    loginPage()
    WhatPageAreUserOn("login")
}



function login() {
    navigator.geolocation.getCurrentPosition(function(location) {
        if ($('#username').val() && $('#password').val()) {
            let username = $('#username').val()
            let password = $('#password').val()



            $.get('php/pwcheck.php', {
                username: username,
                password: password,
                lat: location.coords.latitude,
                lng: location.coords.longitude
            })
            .done((data) => {
                console.log(data)
                data = JSON.parse(data)
                console.log(data)
                

                if (data[0] != undefined) {
                    console.log('Login success, userId: ' + data[0].userId + ' username: ' + data[0].userName)
                    WhatPageAreUserOn("game", data[0].userId, data[0].userName)
                    map()
                    userInloged = data
                    setCookie(userInloged)
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

function resetPW() {
    let email = prompt('Enter e-mail to reset password')
    $.get('php/sendpass.php', {
        mail: email
    })
    .done((data) =>{
        
    })
    console.log('Reset code has been sent to: ' + email)
    //Reset functionality...
}


/* Elements */
function loginPage() {
    $('#login_page').html('')

    $("<div>", {
        'id': 'loginContainer',
        appendTo:'#login_page'
    })

    $("<div>", {
        html: 'KOSMOVO',
        appendTo:'#loginContainer'
    }).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '40px', 'text-align': 'center'})

    $("<div>", {
        html: '2020',
        appendTo:'#loginContainer'
    }).css({'color': 'var(--main-yellow-color)', 'font-family': 'Molot', 'font-size': '78px', 'margin-top': '-30px', 'text-align': 'center'})

    $("<div>", {
        'id': 'logo',
        appendTo:'#loginContainer'
    }).css({'background-image': 'url(img/logo.png)', 'height': '227px', 
             'background-size': 'cover', 'background-repeat': 'no-repeat', 'margin-bottom': '20px'})
    
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

    $("<input>", {
        value: 'Forgot password',
        class: 'button',
        'id': 'resetPW',
        type:'button',
        appendTo:'#loginContainer',
    }).click(resetPW)

}