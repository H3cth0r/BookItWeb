
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

    //si da click en un botón, mandar:
    /*
    {
        "objectType" : "HRDWR",
        "objectId" : 3,
        "objectName" : "Dell PC"
    }
    Al servicio:
    /reservations/makeReservation
    como POST
    */
    
})