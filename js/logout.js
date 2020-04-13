$(".logout_button").click(function(){
    document.cookie = ""
    location.reload();
})