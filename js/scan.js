$("#scanInputButton").click(() => {
    $("#errorMSG").css({display: "none"})

    let code = $("#scanInput").val()

    $.get("php/scan.php", { userId: userInloged[0].userId , code: code})
    .done((data) =>{
        data = JSON.parse(data)
        console.log(data)
        if(data.length != 0){
            $("#scanWrapper").css({display: "none"})
            createQuestion(data[0])
        }else{
            $.get("php/checkCodeExist.php", {code: code})
            .done((data) => {
                data = JSON.parse(data)
                if(data.length != 0){
                    errorMSG("Code already used")
                }else{
                    errorMSG("invalid code")
                }
            })
        }
        
    })

})

function errorMSG(msg){
    $("#errorMSG").css({display: "block"})
    $("#errorMSG").html(msg)
}

let isShowing = false
$("#scanButtonWrapper").click(()=>{
    if(!isShowing){
        $("#scanWrapper").css({display: "flex"})
        $("#errorMSG").css({display: "none"})
        $("#scanInput").val("")
        isShowing = true
    }else{
        $("#scanWrapper").css({display: "none"})
        isShowing = false
    }
   
})