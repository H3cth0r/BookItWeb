var day = new Date();
//var maxDays = 15;
var dayCount = 0;
var dayStr;
//var maxPeople =10;
var peopleCount = 0;
var roomID = room.roomId;
//var maxDays = room.maxDays;
//var maxPeople = room.maxPeople;


function getDayName (day) {
    switch (day) {
        case 0:
            return "Sunday";
        case 1:
            return "Monday";
        case 2:
            return "Tuesday";
        case 3:
            return "Wednesday";
        case 4:
            return "Thursday";
        case 5:
            return "Friday";
        case 6:
            return "Saturday";
    }
}

function selectorDias() {
       

    $("#dia").text(getDayName(day.getDay()) + " " +  day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear());
    
    $("#menos").click(function() {
        if (dayCount > 0) {
            dayCount--;
            day.setDate(day.getDate() - 1);
            var dayString = getDayName(day.getDay()) + " " + day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear()
            $("#dia").text(dayString);
            
        }
    });
    
    $("#mas").click(function() {
            if (dayCount < maxDays) {
                dayCount++;
                day.setDate(day.getDate() + 1);
                $("#dia").text(getDayName(day.getDay()) + " " +day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear());
            }
    }); 

    $("#btnSaveD").click(function() {
        $("#contenedorDias").hide();
        $("#ticketSalida").show();
        ticket();
    });
    
}
function selectorPersonas() {
    $("#personas").text(peopleCount);
    $("#btnAdd").click(function() {
        if (peopleCount < maxPeople) {
            peopleCount++;
        }
        $("#personas").text(peopleCount);
    });

    $("#btnRemove").click(function() {
        if (peopleCount > 0) {
            peopleCount--;
        }
        $("#personas").text(peopleCount);
    
    });
    $("#btnSaveP").click(function() {
        $("#contenedorPersonas").hide();
        selectorDias();
        $("#contenedorDias").show();
    });
}

function ticket() {

    $("#ticket").append("<p>From: </p>");
    $("#ticket").append(getDayName(day.getDay()) + " " + day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear() + "</p>");
    $("#ticket").append("<p>Personas: " + peopleCount + "</p>");
    $("#btnSaveT").click(function() {
        $.ajax({
            url: "Reservas/Reservas",
            type: "POST",
            data: {
                fechas: day,
                personas: peopleCount,
                roomId : roomID
            },
            success: function (data) {
                alert("Reserva realizada");
            },
            error: function (data) {
                alert("Error");
            }

}
        );
    });

}
$(document).ready(function() {
    

    selectorPersonas();
    $("#contenedorDias").hide();
    $("#ticketSalida").hide();

   
    
    
});

