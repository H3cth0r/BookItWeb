
/*SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType, 
                                DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, DT3.weight, HardwareClass.name, 
HardwareClass.operativeSystem, HardwareClass.description as objectDescription*/
/* para ponerlo como en figma faltan:
user    Name
        Surname
        BirthDate
        organization

*/ 

for (var i = 0; i < HRDWR.length; i++) {
    var ticked = HRDWR[i];
    var ticketId = HRDWR.ticketId;
    var userId = HRDWR.userId;
    var dateRegistered = HRDWR.dateRegistered;
    var startDate = HRDWR.startDate;
    var endDate = HRDWR.endDate;
    var objectId = HRDWR.objectId;
    var objectType = HRDWR.objectType;
    var objectName = HRDWR.objectName;
    var ticketDescription = HRDWR.ticketDescription;
    var qrCode = HRDWR.qrCode;
    var weight = HRDWR.weight;
    var name = HRDWR.name;
    var operativeSystem = HRDWR.operativeSystem;
    var objectDescription = HRDWR.objectDescription;
     /* aqui añadir el html del ticket */
    let imagenes = `<img src="`+ userId + `" alt="QR Code" width="100" height="100">`;
    let qrImage = `<img src="`+ qrCode + `" alt="QR Code" width="100" height="100">`;
    let tickId = `<p>`+ ticketId + `</p>`;

    $('#qrCode').append(qrImage);
    $('#profile').append(imagenes);
    $('#ticketsid').append(tickId);
    var tickedInside = `<div class="ticket">
        <div class="ticket__header">
            <h2 class="ticket__title">{</h2>
            <h2 class="ticket__title">"reservation":{</h2>
            <h2 class="ticket__title">"user":{</h2>
            <p > "name": "`+ userName + `",</p>
            <p > "surname": "`+ userSurname + `",</p>
            <p > "birthDate": "`+ userBirthDate + `",</p>
            <p > "organization": "`+ userOrganization + `",</p>
            <h2 class="ticket__title">},</h2>
            <p > "type": "`+ objectType + `",</p>
            <p > "nameHardware": "`+ objectName + `",</p>
            <p > "description": "`+ ticketDescription + `",</p>
            <p > "startDate": "`+ startDate + `",</p>
            <p > "endDate": "`+ endDate + `",</p>

            <h2 class="ticket__title">},</h2>
            <h2 class="ticket__title">}</h2>
            <button id="edit">EDIT</button>

        </div>
        </div>`;
        
    
    $('#datosTicket').append(tickedInside);

    if (('#edit').click(function(){
        $('#datosTicket').empty();
            var tickedInside = `<div class="ticket">
            <div class="ticket__header">
                <h2 class="ticket__title">{</h2>
                <h2 class="ticket__title">"reservation":{</h2>
                <h2 class="ticket__title">"user":{</h2>
                <p > "name": "`+ userName + `",</p>
                <p > "surname": "`+ userSurname + `",</p>
                <p > "birthDate": "`+ userBirthDate + `",</p>
                <p > "organization": "`+ userOrganization + `",</p>
                <h2 class="ticket__title">},</h2>
                <p > "type": "`+ objectType + `",</p>
                <p > "nameHardware": "`+ objectName + `",</p>
                <p > "description": "`+ ticketDescription + `",</p>
                <input type="date" id="startDate" value="`+ startDate + `">
                <input type="date" id="endDate" value="`+ endDate + `">

                <h2 class="ticket__title">},</h2>
                <h2 class="ticket__title">}</h2>
                <button id="safe">SAVE</button>

            </div>
            </div>`;
        $('#datosTicket').append(tickedInside);

        if (('#safe').click(function(){
            $.ajax({
                url: '/api/updateQrCodes',
                type: 'POST',
                data: {
                    ticketId: ticketId,
                    startDate: $('#startDate').val(),
                    endDate: $('#endDate').val()
                },
                success: function (data) {
                    console.log(data);
                }
            });
        }));
    }
    ));
}

/*SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType,
                       DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, DT3.weight, SoftwareClass.name, 
                       SoftwareClass.brand, SoftwareClass.operativeSystem, SoftwareClass.description as objectDescription*/

for (var i = 0; i < SFTWR.length; i++) {
    var ticked = SFTWR[i];
    var ticketId = SFTWR.ticketId;
    var userId = SFTWR.userId;
    var dateRegistered = SFTWR.dateRegistered;
    var startDate = SFTWR.startDate;
    var endDate = SFTWR.endDate;
    var objectId = SFTWR.objectId;
    var objectType = SFTWR.objectType;
    var objectName = SFTWR.objectName;
    var ticketDescription = SFTWR.ticketDescription;
    var qrCode = SFTWR.qrCode;
    var weight = SFTWR.weight;
    var name = SFTWR.name;
    var brand = SFTWR.brand;
    var operativeSystem = SFTWR.operativeSystem;
    var objectDescription = SFTWR.objectDescription;
        /* aqui añadir el html del ticket */

    let imagenes = `<img src="`+ userId + `" alt="QR Code" width="100" height="100">`;
    let qrImage = `<img src="`+ qrCode + `" alt="QR Code" width="100" height="100">`;
    let tickId = `<p>`+ ticketId + `</p>`;
    $('#qrCode').append(qrImage);
    $('#profile').append(imagenes);
    $('#ticketsid').append(tickId);
    var tickedInside = `<div class="ticket">
        <div class="ticket__header">
            <h2 class="ticket__title">{</h2>
            <h2 class="ticket__title">"reservation":{</h2>
            <h2 class="ticket__title">"user":{</h2>
            <p > "name": "`+ userName + `",</p>
            <p > "surname": "`+ userSurname + `",</p>
            <p > "birthDate": "`+ userBirthDate + `",</p>
            <p > "organization": "`+ userOrganization + `",</p>
            <h2 class="ticket__title">},</h2>
            <p > "type": "`+ objectType + `",</p>
            <p > "prefix": "`+ brand + `",</p>
            <p > "description": "`+ ticketDescription + `",</p>
            <p > "startDate": "`+ startDate + `",</p>
            <p > "endDate": "`+ endDate + `",</p>

            <h2 class="ticket__title">},</h2>
            <h2 class="ticket__title">}</h2>
            <button id="edit">EDIT</button>

        </div>
        </div>`;

    $('#datosTicket').append(tickedInside);

    if (('#edit').click(function(){

        $('#datosTicket').empty();
        var tickedInside = `<div class="ticket">
        <div class="ticket__header">
            <h2 class="ticket__title">{</h2>
            <h2 class="ticket__title">"reservation":{</h2>
            <h2 class="ticket__title">"user":{</h2>
            <p > "name": "`+ userName + `",</p>
            <p > "surname": "`+ userSurname + `",</p>
            <p > "birthDate": "`+ userBirthDate + `",</p>
            <p > "organization": "`+ userOrganization + `",</p>
            <h2 class="ticket__title">},</h2>
            <p > "type": "`+ objectType + `",</p>
            <p > "prefix": "`+ objectName + `",</p>
            <p > "description": "`+ ticketDescription + `",</p>
            <input type="date" id="startDate" value="`+ startDate + `">
            <input type="date" id="endDate" value="`+ endDate + `">

            <h2 class="ticket__title">},</h2>
            <h2 class="ticket__title">}</h2>
            <button id="safe">SAVE</button>

        </div>
        </div>`;
        $('#datosTicket').append(tickedInside);

        if (('#safe').click(function(){
            $.ajax({
                url: '/api/updateQrCodes',
                type: 'POST',
                data: {
                    ticketId: ticketId,
                    startDate: $('#startDate').val(),
                    endDate: $('#endDate').val()
                },
                success: function (data) {
                    console.log(data);
                }
            });
        }));
    }
    ));
}

/*SELECT DT2.ticketId, DT2.userId, DT2.dateRegistered, DT2.startDate, DT2.endDate, DT2.objectId, DT2.objectType,
                       DT2.objectName, DT2.description as ticketDescription, DT2.qrCode, DT2.weight, Rooms.name, 
                       Rooms.label, Rooms.location, Rooms.description as objectDescription*/

for (var i = 0; i < ROOM.length; i++) {
    var ticked = ROOM[i];
    var ticketId = ROOM.ticketId;
    var userId = ROOM.userId;
    var dateRegistered = ROOM.dateRegistered;
    var startDate = ROOM.startDate;
    var endDate = ROOM.endDate;
    var objectId = ROOM.objectId;
    var objectType = ROOM.objectType;
    var objectName = ROOM.objectName;
    var ticketDescription = ROOM.ticketDescription;
    var qrCode = ROOM.qrCode;
    var weight = ROOM.weight;
    var name = ROOM.name;
    var label = ROOM.label;
    var location = ROOM.location;
    var objectDescription = ROOM.objectDescription;
        /* aqui añadir el html del ticket */
    
    let imagenes = `<img src="`+ userId + `" alt="QR Code" width="100" height="100">`;
    let qrImage = `<img src="`+ qrCode + `" alt="QR Code" width="100" height="100">`;
    let tickId = `<p>`+ ticketId + `</p>`;
    $('#qrCode').append(qrImage);
    $('#profile').append(imagenes);
    $('#ticketsid').append(tickId);
    var tickedInside = `<div class="ticket">
        <div class="ticket__header">
            <h2 class="ticket__title">{</h2>
            <h2 class="ticket__title">"reservation":{</h2>
            <h2 class="ticket__title">"user":{</h2>
            <p > "name": "`+ userName + `",</p>
            <p > "surname": "`+ userSurname + `",</p>
            <p > "birthDate": "`+ userBirthDate + `",</p>
            <p > "organization": "`+ userOrganization + `",</p>
            <h2 class="ticket__title">},</h2>
            <p > "type": "`+ objectType + `",</p>
            <p > "label": "`+ objectName + `",</p>
            <p > "description": "`+ ticketDescription + `",</p>
            <p > "startDate": "`+ startDate + `",</p>
            <p > "endDate": "`+ endDate + `",</p>

            <h2 class="ticket__title">},</h2>
            <h2 class="ticket__title">}</h2>
            <button id="edit">EDIT</button>

        </div>
        </div>`;
    $('#datosTicket').append(tickedInside);
    if (('#edit').click(function(){

        $('#datosTicket').empty();
        var tickedInside = `<div class="ticket">
        <div class="ticket__header">
            <h2 class="ticket__title">{</h2>
            <h2 class="ticket__title">"reservation":{</h2>
            <h2 class="ticket__title">"user":{</h2>
            <p > "name": "`+ userName + `",</p>
            <p > "surname": "`+ userSurname + `",</p>
            <p > "birthDate": "`+ userBirthDate + `",</p>
            <p > "organization": "`+ userOrganization + `",</p>
            <h2 class="ticket__title">},</h2>
            <p > "type": "`+ objectType + `",</p>
            <p > "label": "`+ objectName + `",</p>
            <p > "description": "`+ ticketDescription + `",</p>
            <input type="date" id="startDate" value="`+ startDate + `">
            <input type="date" id="endDate" value="`+ endDate + `">

            <h2 class="ticket__title">},</h2>
            <h2 class="ticket__title">}</h2>
            <button id="safe">SAVE</button>

        </div>
        </div>`;
        $('#datosTicket').append(tickedInside);

        if (('#safe').click(function(){
            $.ajax({
                url: '/api/updateQrCodes',
                type: 'POST',
                data: {
                    ticketId: ticketId,
                    startDate: $('#startDate').val(),
                    endDate: $('#endDate').val()
                },
                success: function (data) {
                    console.log(data);
                }
            });
        }));
    }
    ));
}


let diaI = new Date(startDate);
let diaF = new Date(endDate);
let diaInicial = diaI.getDate();
let diaFinal = diaF.getDate();

let fechas = `<p>`+ diaInicial + ` ` + diaI + ` </p>
                <p>`+ diaFinal + ` ` + diaF + ` </p>`;

$('#diaTIckets').append(fechas);

