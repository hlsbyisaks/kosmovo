function createUser() {
    if ($('#username').val() && $('#password').val() && $('#repeatPassword').val() && $('#email').val()) {
        if ($('#password').val() == $('#repeatPassword').val()) {
            let username = $('#username').val()
            let password = $('#password').val()
            let mail = $('#email').val()

            $.get('php/register.php', {
                username: username,
                password: password,
                mail: mail
            })
            .done((data) => {
                loginPage()
            })
        } else {
            alert('Passwords do not match')
        }
    } else {
        alert('Please fill all forms')
    }
}




/* Elements */

function registerPage() {
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
        'id': 'email',
        placeholder: 'E-mail',
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
        'id': 'repeatPassword',
        placeholder: 'Repeat password',
        type:'password',
        appendTo:'#loginContainer'
    })
    
    $("<input>", {
        value: 'Register',
        class: 'button',
        'id': 'submit',
        type:'button',
        appendTo:'#loginContainer',
    }).click(createUser)
}