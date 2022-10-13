$( document ).ready(function() {

    $("#newBookingButton").click(function(){
        $("#second", parent.document).attr("src", "/reservations/showHardware");
        window.top.postMessage('hello', '*')
        console.log("running")
    })
    
});