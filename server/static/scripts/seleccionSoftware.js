

for (var i = 0; i < softW.length; i++) {
    var software = softW[i];
    var softwareName = software.name;
    var softwareBrand = software.brand;
    var softwareOS = software.operativeSystem;
    var softwareDescription = software.description;
    var softwarePrefix = software.prefix;
    var softwareMaxDays = software.maxDays;
    var softwareWeight = software.totalWeight;
    var softwareHTML = "<div class='software'>";
    softwareHTML += "<h3>" + softwareName + "</h3>";
    softwareHTML += "<p>" + softwareBrand + "</p>";
    softwareHTML += "<p>" + softwareDescription + "</p>";
    if (softwareWeight < 150) {
        softwareHTML += "<p>Disponible 🟢</p>";
    } else {
        softwareHTML += "<p>No disponible 🔴</p>";
    }
    softwareHTML += "<button name='generalObjectId' value='" + i + "' class='btn btn-primary' id='botonenvio'>BooKMe</button>"
    softwareHTML += "</div>";
    
    softwareHTML += "</div>";
    document.write(softwareHTML);
    $("#botonenvio").click(function () {
        let index = $('#botonenvio').val();
        
        $.ajax({
            url: "/makeReservation",
            type: "POST",
            data: {"objectType" : "software",
                   "objectId" : softW[index].generalObjectId, 
                   "objectName" : softW[index].name}

        });
    }
    );
}