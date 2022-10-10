
/*for (var i = 0; i < softW.length; i++) {
    var software = softW[i];
    var softwareName = software.name;
    var softwareBrand = software.brand;
    var softwareOS = software.operativeSystem;
    var softwareDescription = software.description;
    var softwarePrefix = software.prefix;
    var softwareMaxDays = software.maxDays;
    var softwareQuantity = software.quantity;
    var softwareHTML = "<div class='software'>";
    softwareHTML += "<h3>" + softwareName + "</h3>";
    softwareHTML += "<p>" + softwareBrand + "</p>";
    softwareHTML += "<p>" + softwareDescription + "</p>";
    if (softwareQuantity > 0) {
        softwareHTML += "<p>Disponible 🟢</p>";
    } else {
        softwareHTML += "<p>No disponible 🔴</p>";
    }
    
    softwareHTML += "</div>";
    
    softwareHTML += "</div>";
    document.write(softwareHTML);
    SELECT generalObjectID, identifier, description, operativeSystem, name, maxDays, SUM(ResTicket.weight) as totalWeight FROM
        (SELECT DT.*, AvailableObjects.generalObjectID, AvailableObjects.hO FROM 
        (SELECT (HardwareClass.prefix || "-" || HardwareObjects.inClassId) as identifier, inTypeId, HardwareClass.*
        FROM HardwareObjects LEFT JOIN HardwareClass ON (HardwareClass.classId = HardwareObjects.classId)) DT
        INNER JOIN AvailableObjects 
        ON (DT.inTypeId = AvailableObjects.hO)) DT2
        LEFT JOIN 
        (SELECT ReservationTicket.objectId, ReservationTicket.weight FROM ReservationTicket WHERE  ReservationTicket.startDate 
        BETWEEN datetime("now", "-5 hours") AND datetime("now", "-5 hours", "+7 days", "-0.001 seconds")) ResTicket
        ON (ResTicket.objectID = DT2.generalObjectID) WHERE availability = 1
        GROUP BY DT2.generalObjectID
}*/

$(document).ready(function () {
        for (var i = 0; i < hardw.length; i++) {
            var hardware = hardw[i];
            var generalObjectId = hardware.generalObjectId;
            var hardwareName = hardware.name;
            var hardwareOS = hardware.operativeSystem;
            var hardwareDescription = hardware.description;
            var hardwarePrefix = hardware.identifier;
            var hardwareMaxDays = hardware.maxDays;
            var hardwareWeight = hardware.totalWeight;
            
            var hardwareHTML = "<div class='hardware'>";
            hardwareHTML += "<p>" + hardwareName + "</p>";
            hardwareHTML += "<p>" + hardwarePrefix + "</p>";
            
            if (hardwareWeight < 150) {
                hardwareHTML += "<p>Available       🟢</p>";
            }
            else {
                hardwareHTML += "<p>Not Available       🔴</p>";
            }
            hardwareHTML += "<button name='generalObjectId' value='" + generalObjectId + "' class='btn btn-primary' id='botonenvio'>BooKMe</button>"
            hardwareHTML += "</div>";
            
            document.write(hardwareHTML);
            console.log(i)
        }


    $("#botonenvio").click(function () {
        var generalObjectId = $('#boton-ejemplo').val();
        $.ajax({
            url: "/Reservas/Reservas",
            type: "POST",
            data: { objectType : "hardware", objectId : generalObjectId, objectName : hardwareName }

        });
    }
    );
});