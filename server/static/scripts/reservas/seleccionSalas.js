var counter = 0;
$(document).ready(function () {
    counter = counter + 1;
    console.log("Here")
    console.log(counter)
for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    var roomName = room.name;
    var roomLocation = room.location;
    var roomCapacity = room.capacity;
    var roomWeight = room.totalWeight;
    var roomMaxDays = room.maxDays;
    var roomDescription = room.description;
    var roomLabel = room.label;
    var roomID = room.generalObjectId;
    var roomLink = "room.html?roomID=" + roomID;
    var roomHTML = "<div class='room'>";
    roomHTML += "<h3>" + roomName + "</h3>";
    roomHTML += "<p>" + roomLocation + "</p>";
    roomHTML += "<p>" + roomDescription + "</p>";
    roomHTML += "<p>Capacidad: " + roomCapacity + "</p>";
    if (roomWeight < 150) {
        roomHTML += "<p>Available       🟢</p>";
    }
    else {
        roomHTML += "<p>Not Available       🔴</p>";
    }
    roomHTML += "<p>Días máximos de reserva: " + roomMaxDays + "</p>";
    roomHTML += "<button name='generalObjectId' value='" + i + "' class='btn btn-primary botonenvio' id='botonenvio'>BooKMe</button>"
    roomHTML += "</div>";
    $('#main_table').append(roomHTML);
    $(".botonenvio").click(function () {

        let index = $(this).val();
        console.log(rooms[index])
        var data = {"objectType" : "ROOMS",
                    "objectId" : rooms[index].generalObjectID, 
                    "objectName" : rooms[index].name};
        console.log(data)
        if (rooms[index].maxDays == 1){
            $.redirect("/reservations/daySelect", data);
        }
        else{
            $.redirect("/reservations/daysSelect", data);
        }
    });
}
});
