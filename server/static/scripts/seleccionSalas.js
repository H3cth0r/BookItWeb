
for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    var roomName = room.name;
    var roomLocation = room.location;
    var roomCapacity = room.capacity;
    var roomWeight = room.totalWeight;
    var roomMaxDays = room.maxDays;
    var roomDescription = room.description;
    var roomLabel = room.label;
    var roomID = room.roomId;
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
    roomHTML += "<button name='generalObjectId' value='" + i + "' class='btn btn-primary' id='botonenvio'>BooKMe</button>"
    roomHTML += "</div>";
    document.write(roomHTML);

    $("#botonenvio").click(function () {
        let index = $('#botonenvio').val();
        
        $.ajax({
            url: "/makeReservation",
            type: "POST",
            data: {"objectType" : "room",
                   "objectId" : rooms[index].generalObjectId, 
                   "objectName" : rooms[index].name}

        });
    }
    );
}