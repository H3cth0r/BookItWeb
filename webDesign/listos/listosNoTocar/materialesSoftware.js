var softW = [{ /* poner el json y despues poner las variables bien*/
    "quantity":5,
    "name":"Adobe Photoshop",
    "brand":"Adobe",
    "operativeSystem":"Windows 10+",
    "description":"Adobe XD apoya al diseño vectorial y a los sitios web wireframe, creando prototipos simples e interactivos con un solo clic.",
    "prefix":"ADBXDW10",
    "maxDays":"12"
  },{
    "quantity":5,
    "name":"Adobe Photoshop",
    "brand":"Adobe",
    "operativeSystem":"Windows 10+",
    "description":"Adobe XD apoya al diseño vectorial y a los sitios web wireframe, creando prototipos simples e interactivos con un solo clic.",
    "prefix":"ADBXDW10",
    "maxDays":"12"
  }];

for (var i = 0; i < softW.length; i++) {
    var software = softW[i];
    var softwareName = software.name;
    var softwareBrand = software.brand;
    var softwareOS = software.operativeSystem;
    var softwareDescription = software.description;
    var softwarePrefix = software.prefix;
    var softwareMaxDays = software.maxDays;
    var softwareQuantity = software.quantity;
            let the = `<div class="single_row_user" id="` + softwareName + `">

                        <p id ="prefijo"> ` + softwarePrefix + ` </p>
                        <p id="nombreObjeto">` + softwareName + `</p>
                        <p id="descripcionObjeto">` + softwareDescription + `</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero" value=` + softwareQuantity + `>
                        <p id="tipo"> Software </p>
                        <p id="sistema">` + softwareOS + `</p>
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox" >
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('` + softwareName + `');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('` + softwareName + `');">Save</button></div>
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


function block_button(id_val){
    alert("blocked " + id_val)
}
