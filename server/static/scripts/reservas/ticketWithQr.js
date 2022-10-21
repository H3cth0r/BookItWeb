
/*SELECT DT3.ticketId, DT3.userId, DT3.dateRegistered, DT3.startDate, DT3.endDate, DT3.objectId, DT3.objectType, 
                                DT3.objectName, DT3.description as ticketDescription, DT3.qrCode, DT3.weight, HardwareClass.name, 
HardwareClass.operativeSystem, HardwareClass.description as objectDescription*/
/* para ponerlo como en figma faltan:
user    Name
        Surname
        BirthDate
        organization

*/ 





$(document).ready(function () {
    console.log(ticket);
    objeto = ticket.objectType;
    let userName = ticket.firstName;
    let userSurname = ticket.lastName;
    let userBirthDate = ticket.birthDate;
    let userOrganization = ticket.organization;


    if (objeto == "HRDWR") {
        var hardware = ticket;
        var ticketId = hardware.ticketId;
        var userId = hardware.userId;
        var dateRegistered = hardware.dateRegistered;
        var startDate = hardware.startDate;
        var endDate = hardware.endDate;
        var objectId = hardware.objectId;
        var objectType = hardware.objectType;
        var objectName = hardware.objectName;
        var ticketDescription = hardware.ticketDescription;
        var qrCode = hardware.qrCode;
        var weight = hardware.weight;
        var name = hardware.name;
        var operativeSystem = hardware.operativeSystem;
        var objectDescription = hardware.objectDescription;
        /* aqui añadir el html del ticket */

        $('#ticketsid').append(ticketId);
        var tickedInside = `
            <div class="ticket__header">
                <p class="ticket__title">{</p>
                <p class="ticket__title">"reservation":{</p>
                <p class="ticket__title">"user":{</p>
                <p > "name": "`+ userName + `",</p>
                <p > "surname": "`+ userSurname + `",</p>
                <p > "birthDate": "`+ userBirthDate + `",</p>
                <p > "organization": "`+ userOrganization + `",</p>
                <p class="ticket__title">},</p>
                <p > "type": "`+ objectType + `",</p>
                <p > "nameHardware": "`+ objectName + `",</p>
                <p > "description": "`+ ticketDescription + `",</p>
                <p > "startDate": "`+ startDate + `",</p>
                <p > "endDate": "`+ endDate + `",</p>

                <p class="ticket__title">},</p>
                <p class="ticket__title">}</p>

            </div>`;
            
        
        $('#textoTicket').append(tickedInside);

        if ($('#edit').click(function(){
            $('#textoTicket').empty();
                var tickedInside = `
                <div class="ticket__header">
                    <p class="ticket__title">{</p>
                    <p class="ticket__title">"reservation":{</p>
                    <p class="ticket__title">"user":{</p>
                    <p > "name": "`+ userName + `",</p>
                    <p > "surname": "`+ userSurname + `",</p>
                    <p > "birthDate": "`+ userBirthDate + `",</p>
                    <p > "organization": "`+ userOrganization + `",</p>
                    <p class="ticket__title">},</p>
                    <p > "type": "`+ objectType + `",</p>
                    <p > "nameHardware": "`+ objectName + `",</p>
                    <p > "description": "`+ ticketDescription + `",</p>
                    <input type="date" id="startDate" value="`+ startDate + `">
                    <input type="date" id="endDate" value="`+ endDate + `">

                    <p class="ticket__title">},</p>
                    <p class="ticket__title">}</p>
                    <button id="safe">SAVE</button>

                </div>
                `;
            $('#textoTicket').append(tickedInside);

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

    if (objeto == "SFTWR") {
        var software = ticket;
        var ticketId = software.ticketId;
        var userId = software.userId;
        var dateRegistered = software.dateRegistered;
        var startDate = software.startDate;
        var endDate = software.endDate;
        var objectId = software.objectId;
        var objectType = software.objectType;
        var objectName = software.objectName;
        var ticketDescription = software.ticketDescription;
        var qrCode = software.qrCode;
        var weight = software.weight;
        var name = software.name;
        var brand = software.brand;
        var operativeSystem = software.operativeSystem;
        var objectDescription = software.objectDescription;
            /* aqui añadir el html del ticket */

        $('#ticketsid').append(ticketId);
        var tickedInside = `
            <div class="ticket__header">
                <p class="ticket__title">{</p>
                <p class="ticket__title">"reservation":{</p>
                <p class="ticket__title">"user":{</p>
                <p > "name": "`+ userName + `",</p>
                <p > "surname": "`+ userSurname + `",</p>
                <p > "birthDate": "`+ userBirthDate + `",</p>
                <p > "organization": "`+ userOrganization + `",</p>
                <p class="ticket__title">},</p>
                <p > "type": "`+ objectType + `",</p>
                <p > "prefix": "`+ brand + `",</p>
                <p > "description": "`+ ticketDescription + `",</p>
                <p > "startDate": "`+ startDate + `",</p>
                <p > "endDate": "`+ endDate + `",</p>

                <p class="ticket__title">},</p>
                <p class="ticket__title">}</p>

            </div>
            `;

        $('#textoTicket').append(tickedInside);

        if ($('#edit').click(function(){

            $('#textoTicket').empty();
            var tickedInside = `
            <div class="ticket__header">
                <p class="ticket__title">{</p>
                <p class="ticket__title">"reservation":{</p>
                <p class="ticket__title">"user":{</p>
                <p > "name": "`+ userName + `",</p>
                <p > "surname": "`+ userSurname + `",</p>
                <p > "birthDate": "`+ userBirthDate + `",</p>
                <p > "organization": "`+ userOrganization + `",</p>
                <p class="ticket__title">},</p>
                <p > "type": "`+ objectType + `",</p>
                <p > "prefix": "`+ objectName + `",</p>
                <p > "description": "`+ ticketDescription + `",</p>
                <input type="date" id="startDate" value="`+ startDate + `">
                <input type="date" id="endDate" value="`+ endDate + `">

                <p class="ticket__title">},</p>
                <p class="ticket__title">}</p>
                <button id="safe">SAVE</button>

            </div>
            `;
            $('#textoTicket').append(tickedInside);

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

    if (objeto == "ROOM") {
        var sala = ticket;
        var ticketId = sala.ticketId;
        var userId = sala.userId;
        var dateRegistered = sala.dateRegistered;
        var startDate = sala.startDate;
        var endDate = sala.endDate;
        var objectId = sala.objectId;
        var objectType = sala.objectType;
        var objectName = sala.objectName;
        var ticketDescription = sala.ticketDescription;
        var qrCode = sala.qrCode;
        var weight = sala.weight;
        var name = sala.name;
        var label = sala.label;
        var location = sala.location;
        var objectDescription = sala.objectDescription;
            /* aqui añadir el html del ticket */

        $('#ticketsid').append(ticketId);
        var tickedInside = `
            <div class="ticket__header">
                <p class="ticket__title">{</p>
                <p class="ticket__title">"reservation":{</p>
                <p class="ticket__title">"user":{</p>
                <p > "name": "`+ userName + `",</p>
                <p > "surname": "`+ userSurname + `",</p>
                <p > "birthDate": "`+ userBirthDate + `",</p>
                <p > "organization": "`+ userOrganization + `",</p>
                <p class="ticket__title">},</p>
                <p > "type": "`+ objectType + `",</p>
                <p > "label": "`+ objectName + `",</p>
                <p > "description": "`+ ticketDescription + `",</p>
                <p > "startDate": "`+ startDate + `",</p>
                <p > "endDate": "`+ endDate + `",</p>

                <p class="ticket__title">},</p>
                <p class="ticket__title">}</p>

            </div>
            `;
        $('#textoTicket').append(tickedInside);
        if ($('#edit').click(function(){

            $('#textoTicket').empty();
            var tickedInside = `
            <div class="ticket__header">
                <p class="ticket__title">{</p>
                <p class="ticket__title">"reservation":{</p>
                <p class="ticket__title">"user":{</p>
                <p > "name": "`+ userName + `",</p>
                <p > "surname": "`+ userSurname + `",</p>
                <p > "birthDate": "`+ userBirthDate + `",</p>
                <p > "organization": "`+ userOrganization + `",</p>
                <p class="ticket__title">},</p>
                <p > "type": "`+ objectType + `",</p>
                <p > "label": "`+ objectName + `",</p>
                <p > "description": "`+ ticketDescription + `",</p>
                <input type="date" id="startDate" value="`+ startDate + `">
                <input type="date" id="endDate" value="`+ endDate + `">

                <p class="ticket__title">},</p>
                <p class="ticket__title">}</p>
                <button id="safe">SAVE</button>

            </div>`;
            $('#textoTicket').append(tickedInside);

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

    $('#diaTicket').append(fechas);

})