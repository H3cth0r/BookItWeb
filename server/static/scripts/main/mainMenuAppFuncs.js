$( document ).ready(function() {
    $("#newBookingButton").click(function(){
        $("#second", parent.document).attr("src", "/menu/objectTypeSelection");
    })

    $("#currentBookingsButton").click(function(){
        $("#second", parent.document).attr("src", "/reservations/currentBookings");
    })
});