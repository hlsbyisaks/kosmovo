function createUser() {
    if ($('#username').val() && $('#password').val() && $('#repeatPassword').val()) {
        if ($('#password').val() == $('#repeatPassword').val()) {
            let username = $('#username').val()
            let password = $('#password').val()

            $.get('php/register.php', {
                username: username,
                password: password
            })
            .done((data) => {
                loginPage()
            })
        } else {
            prompt('Passwords do not match')
        }
    } else {
        prompt('Please fill all forms')
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
        type:'text',
        appendTo:'#loginContainer'
    })

    $("<input>", {
        'id': 'repeatPassword',
        placeholder: 'Repeat password',
        type:'text',
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