let userInloged;
let encPassword

// LOGIN IF COOKIE SAVED
/*
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
}*/

WhatPageAreUserOn("login")
loginPage()


function login() {
    navigator.geolocation.getCurrentPosition(function(location) {
        if ($('#username').val() && $('#password').val()) {
            let username = $('#username').val()
            let password = $('#password').val()



            $.get('php/pwcheck.php', {
                username: username,
                password: password
            })
            .done((data) => {
                console.log(data)
                if (data == 'wrong password') {
                    loginErrorMsg('Error: Incorrect username or password')
                }
                data = JSON.parse(data)
                console.log(data)
                

                if (data[0] != 'wrong password') {
                    console.log('Login success, userId: ' + data[0].userId + ' username: ' + data[0].userName)
                    WhatPageAreUserOn("game", data[0].userId, data[0].userName)
                    userInloged = data
                    initMap()
                    setCookie(userInloged)
                    initMap()
                    /* send to game page with userId = data[0].userId
                    Set cookie login=true and userid */

                } 
            })
        } else {
            loginErrorMsg('Error: Please fill both forms')
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

//Displays error message at login with the error text as an argument
//Also checks array for empty input fields to visualize missing inputs
function loginErrorMsg(Msg) {
    if (Msg == '') {
        $('#loginErrorMsg').css({'display': 'none'})
    }

    $('#loginErrorMsg').html(Msg)
    $('#loginErrorMsg').css({'display': 'initial'})

    array =['#username', '#password', '#email', '#repeatPassword']
    array.forEach(element => {
        if ($(element).val() == '') {
            $(element).css({'border-bottom': '2px solid var(--main-yellow-color)'})
            $(element).click(function() {
                $(element).css({'border-bottom': '2px solid var(--main-white-color)'})
            })
        }
    });  
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
    }).css({'background-image': 'url(img/logo.png)', 'width': '100%', 'height': '235px', 
             'background-size': 'contain', 'background-repeat': 'no-repeat', 'margin-bottom': '20px'})

    $("<p>", {
    'id': 'loginErrorMsg',
    html: 'test error',
    appendTo:'#loginContainer'
    }).css({'display': 'none'})
    
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