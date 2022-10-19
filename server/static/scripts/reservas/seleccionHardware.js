var counter = 0;
$(document).ready(function () {
    counter = counter + 1;
    console.log("Here")
    console.log(counter)
    for (var i = 0; i < hardw.length; i++) {
        var hardware = hardw[i];
        var generalObjectId = hardware.generalObjectId;
        var hardwareName = hardware.name;
        var hardwarePrefix = hardware.identifier;
        var hardwareWeight = hardware.totalWeight;
        
        var hardwareHTML = "<div class='hardware'>";
        hardwareHTML += "<div class='hardwareName'>"
        hardwareHTML += `<p id="name">` + hardwareName + `</p>`;
        hardwareHTML += `<p id=prefix>` + hardwarePrefix + `</p>`;
        hardwareHTML += "</div>";
        hardwareHTML += `<div class="hardwareWeight">`;
        if (hardwareWeight < 150) {
            hardwareHTML += "<p>Available       🟢</p>";
        }
        else {
            hardwareHTML += "<p>Not Available       🔴</p>";
        }
        hardwareHTML += "</div>";
        hardwareHTML += "<button name='generalObjectId' value='" + i + "' class='btn btn-primary botonenvio'>BooKMe</button>"
        hardwareHTML += "</div>";
        hardwareHTML += `<HR WIDTH="90%" COLOR="black"></HR>`;

        
        $('#main_table').append(hardwareHTML);
    }   


    $(".botonenvio").click(function () {
        let index = $(this).val();
        var data = {"objectType" : "HRDWR",
                    "objectId" : hardw[index].generalObjectID, 
                    "objectName" : hardw[index].name};
        console.log(data)
        if (hardw[index].maxDays == 1){
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
    
    
})
