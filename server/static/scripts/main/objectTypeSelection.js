$( document ).ready(function() {
    $("#softwareTypeBtn").click(function(){
        $("#second", parent.document).attr("src", "/menu/objectTypeSelection");
    })

    $("#softwareTypeBtn").click(function(){
        $("#second", parent.document).attr("src", "/reservations/currentBookings");
    })

    $("#softwareTypeBtn").click(function(){
        $("#second", parent.document).attr("src", "/reservations/currentBookings");
    })

    document.getElementsByTagName("html")[0].style.visibility = "visible";
});