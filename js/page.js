

function WhatPageAreUserOn(thisPage, userID, user){

    let allPageAr = ["login", "game", "scoreboard", "admin"]
    allPageAr.forEach(function(e){
       $("#" + e + "_page").hide()
    })

    $("#" + thisPage + "_page").show()

    if(thisPage == "game"){
        $(".user_name").html(user)
    }
}


