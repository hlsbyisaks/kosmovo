$(".logout_button").click(function(){
    userInloged = ""
    loginPage()
    WhatPageAreUserOn("login")
    document.cookie = ""
    clearInterval(updatingInterval)
})