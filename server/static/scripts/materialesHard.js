for (var i = 0; i < hardW.length; i++) {
    var hardware = hardW[i];
    var hardwareName = hardware.name;
    var hardwareOS = hardware.operativeSystem;
    var hardwareDescription = hardware.description;
    var hardwarePrefix = hardware.prefix;
    var hardwareMaxDays = hardware.maxDays;
    var hardwareQuantity = hardware.quantity;
    var hardwareID = hardware.hardwareId;

    let the = `<div class="single_row_user" id="`+ hardwareName +`">
      
                        <p id="prefijo">`+ hardwarePrefix +`</p>
                        <p id="nombreObjeto">`+ hardwareName +`</p>
                        <p id="descripcionObjeto">`+ hardwareDescription +`</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero" value = `+ hardwareQuantity +`>
                        <p id="tipo"> Hardware </p>
                        <p id="tipo">`+ hardwareOS +`</p>
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('`+ hardwareName +`');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('`+ hardwareName +`s');">Save</button></div>
                    </div>
                    <br>`;
        $('.div_list_users').append(the);
        console.log("lol");
    }



function move_rows(id_val){
    $(`#${id_val}`).remove();
}
// div div objs display: none
// animation make smaller row div
// delete the div
function delete_button(id_val){
    anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });
    setTimeout(move_rows, 800, id_val);
}

function save_button(id_val){
    alert("saved " + id_val)
}

//ajax para guardar en la base de datos
function save_all(){
    alert("saved all")
}