for (var i = 0; i < hardW.length; i++) {
    var hardware = hardW[i];
    var hardwareName = hardware.name;
    var hardwareOS = hardware.operativeSystem;
    var hardwareDescription = hardware.description;
    var hardwarePrefix = hardware.prefix;
    var hardwareMaxDays = hardware.maxDays;
    var hardwareQuantity = hardware.quantity;
    var hardwareID = hardware.classId;

    let the = `<div class="single_row_user" id="`+ hardwareID +`">
      
                        <input type="text" value="`+ hardwarePrefix +`" id="prefijo">
                        <input type="text" value="`+ hardwareName +`" id="nombreObjeto">
                        <textarea rows="2" cols="10" id="descripcionObjeto">`+ hardwareDescription +`</textarea>
                        
                        <input type="number" name="cantidad" id="cantidad" class="numero" value = `+ hardwareQuantity +`>
                        <p id="tipo"> Hardware </p>
                        <input type="text" value="`+ hardwareOS +`" id="tipo">
                        <div class="checkbox" id="chechboxid">
                                    <input type="checkbox" name="disponible" id="disponible" value="true">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('`+ hardwareID +`');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ hardwareID +`s');">Save</button></div>
                    </div>
                    <br>`;
        $('#contenedortodo').append(the);
        console.log("lol");
    }



function move_rows(id_val){
    $(`#${id_val}`).remove();
}
// div div objs display: none
// animation make smaller row div
// delete the div
function delete_button(id_val){
    if (confirm ("¿Estás seguro de que quieres eliminar este objeto?")) {
   /* anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });*/
    setTimeout(move_rows, 800, id_val);
    console.log("deleted " + id_val);
    $.ajax({ 
        url: '/api/deleteHardwareClass', //cambiar esto por la 
        type: 'POST',
        data: JSON.stringify({ "classId" : id_val }), //que victor me diga que mandarle al servidor
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    
        });
    location.reload();
}
}/*{
  "jwt":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImVtYWlsIjoiQTAxNjU5ODkxQHRlYy5teCIsImZpcnN0TmFtZSI6IlBlcG8iLCJsYXN0TmFtZSI6IkxvcGV6IiwiYWRtaW4iOjAsImJsb2NrZWQiOjAsImV4cCI6MTY2NDgzMzc3N30.nCyDkEwjnaqLmFXbt61lsuOKjhlNd0cBBrkyahc1Ldg",
  "classId":1,
  "quantity":7,
  "name":"Mac Book Air",
  "operativeSystem":"macOS 12",
  "description":"CPU = M1\nRAM = 8GB\nSSD = 256GB",
  "prefix":"MACAMTR",
  "availability":true,
  "maxDays":"15"
}
'''*/
 
function save_button(id_val){
    if (confirm ("¿Estás seguro de que quieres guardar los cambios?")) {
    alert("saved " + id_val)
    $.ajax({ 
    url: 'api/edit/hardware', //cambiar esto por la ruta del servidor y añadir bien el json
    type: 'POST',
    data: JSON.stringify({ "jwt" :request.cookies.get('jwt'), "classId" : id_val, "quantity" : $(`#${id_val} #cantidad`).val(), "name" : $(`#${id_val} #nombreObjeto`).val(), "operativeSystem" : $(`#${id_val} #tipo`).val(), "description" : $(`#${id_val} #descripcionObjeto`).val(), "prefix" : $(`#${id_val} #prefijo`).val(), "availability" : $(`#${id_val} #disponible`).val(), "maxDays" : $(`#${id_val} #maxDays`).val() }), //que victor me diga que mandarle al servidor 
    contentType: "application/json",
    dataType: "json",
    success: function(data){
        alert(data);
    }

    });
}
}

function add_button(){
    window.location.href = "/admin/nuevoObjeto" //añadir ruta de la página de añadir objeto
}

    