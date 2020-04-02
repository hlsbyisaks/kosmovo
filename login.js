function login() {
    console.log('login')
}

$("<div>", {
    'id': 'loginContainer',
    appendTo:'#login_page'
})

$("<input>", {
    'id': 'userName',
    type:'text',
    appendTo:'#loginContainer'
})

$("<input>", {
    'id': 'password',
    type:'text',
    appendTo:'#loginContainer'
})

$("<input>", {
    value: 'Login',
    'id': 'submit',
    type:'button',
    appendTo:'#loginContainer',
}).click(login)