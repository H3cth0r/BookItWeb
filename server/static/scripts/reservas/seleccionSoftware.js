
var counter = 0;
$(document).ready(function () {
    counter = counter + 1;
    console.log("Here")
    console.log(counter)
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
    softwareHTML += `<HR WIDTH="90%" COLOR="black"></HR>`;
    softwareHTML += "</div>";
    $('#main_table').append(softwareHTML);}

    $("#botonenvio").click(function () {
        let index = $(this).val();
        var data = {"objectType" : "SOFTW",
        "objectId" : softW[index].generalObjectID, 
        "objectName" : softW[index].name};
        console.log(data)
        if (softW[index].maxDays == 1){
            $.redirect("/reservations/daySelect", data);
        }
        else{
            $.redirect("/reservations/daysSelect", data);
        }

        /*
        $.ajax({
        url: "/reservations/daySelect",
        type: "POST",
        data: {"objectType" : "HRDWR",
            "objectId" : hardw[index].generalObjectId, 
            "objectName" : hardw[index].name},
        success: function (data) {
            document.write(data);
        }

        });
        */

        }
);
});