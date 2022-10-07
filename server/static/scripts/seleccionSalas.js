
for (var i = 0; i < rooms.length; i++) {
    var room = rooms[i];
    var roomName = room.name;
    var roomLocation = room.location;
    var roomCapacity = room.capacity;
    var roomAvailability = room.availability;
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
    if (roomAvailability) {
        roomHTML += "<p>Available       🟢</p>";
    }
    else {
        roomHTML += "<p>Not Available       🔴</p>";
    }
    roomHTML += "<p>Días máximos de reserva: " + roomMaxDays + "</p>";
    roomHTML += "<a href='" + roomLink + "'>BookMe</a>";
    roomHTML += "</div>";
    document.write(roomHTML);
}