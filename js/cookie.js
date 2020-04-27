function setCookie(user){
    document.cookie = user[0].userName + "," + user[0].password;
}


function CookieLogin(){
    if(document.cookie.length > 0){
        let cookie = document.cookie.split(",")
        let account = cookie[0]
        let password = cookie[1]
        return account + password
    }
}