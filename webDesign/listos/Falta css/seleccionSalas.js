var rooms = [
    {
        "roomId":1,
        "name":"Sala de Conferencias 01",
        "location":"Hub de Ciberseguridad, piso 3.",
        "label":"SC01",
        "description":"Sala de conferencias, apta para presentaciones ejecutivas a un público grande.",
        "capacity":40,
        "availability":true,
        "maxDays":"12"
    },
    {
        "roomId":2,
        "name":"Sala de Conferencias 02",
        "location":"Hub de Ciberseguridad, piso 3.",
        "label":"SC01",
        "description":"Sala de conferencias, apta para presentaciones ejecutivas a un público grande.",
        "capacity":40,
        "availability":false,
        "maxDays":"12"
    }
];

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