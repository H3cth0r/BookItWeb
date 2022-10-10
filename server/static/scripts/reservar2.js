var day = new Date();
var day2 = new Date();
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
    
}
function selectorDias2() {

    if (day < day2) {
       

    $("#dia2").text(getDayName(day2.getDay()) + " " +  day2.getDate() + "/" + (day2.getMonth() + 1) + "/" + day2.getFullYear());
    
    $("#menos2").click(function() {
        if (dayCount > 0) {
            dayCount--;
            day2.setDate(day2.getDate() - 1);
            var dayString = getDayName(day2.getDay()) + " " + day2.getDate() + "/" + (day2.getMonth() + 1) + "/" + day2.getFullYear()
            $("#dia2").text(dayString);
            
        }
    });
    
    $("#mas2").click(function() {
            if (dayCount < maxDays) {
                dayCount++;
                day2.setDate(day2.getDate() + 1);
                $("#dia2").text(getDayName(day.getDay()) + " " +day2.getDate() + "/" + (day2.getMonth() + 1) + "/" + day2.getFullYear());
            }
    }); 

    $("#btnSaveD").click(function() {
        $("#contenedorDias").hide();
        $("#contenedorDias2").hide();
        $("#ticketSalida").show();
        ticket();
    });

    } else {
        alert("La fecha de salida debe ser posterior a la de entrada");
    }
    
}

function ticket() {

    $("#ticket").append("<p>From: </p>");
    $("#ticket").append(getDayName(day.getDay()) + " " + day.getDate() + "/" + (day.getMonth() + 1) + "/" + day.getFullYear() + "</p>");
    $("#ticket").append("<p>Personas: " + peopleCount + "</p>");
    $("#btnSaveT").click(function() {
        $.ajax({
            url: "/Reservas/Reservas",
            type: "POST",
            data: {
                fechasInicio: day,
                fechasFin: day2,
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
    

    selectorDias();
    selectorDias2();
    $("#ticketSalida").hide();

   
    
    
});

