$( document ).ready(function() {
    $("#newBookingButton").click(function(){
        window.top.postMessage('hello', '*')
        console.log("running")
    })
});