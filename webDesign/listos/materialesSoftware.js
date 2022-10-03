function add_div(){
    var item_list = ["adobe photoshop" , "adobe premiere" , "adobe after effects" , "adobe illustrator" , "adobe xd" , "adobe lightroom" , "adobe indesign" , "adobe animate" , "adobe dreamweaver" , "adobe bridge"];
    var descripcion_list = ["programa de edicion de imagenes" , "programa de edicion de videos" , "programa de edicion de videos" , "programa de edicion de imagenes" , "programa de edicion de imagenes" , "programa de edicion de imagenes" , "programa de edicion de imagenes" , "programa de edicion de imagenes" , "programa de edicion de paginas web" , "programa de edicion de imagenes"];
    var prefijo_list = ["ps" , "pr" , "ae" , "ai" , "xd" , "lr" , "id" , "an" , "dw" , "br"];
    var sistema_list = ["windows", "windows", "windows", "windows", "windows", "windows", "windows", "windows", "windows", "windows"];

    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${item_list[i]}">

                        <p id ="prefijo"> ${prefijo_list[i]} </p>
                        <p id="nombreObjeto">${item_list[i]}</p>
                        <p id="descripcionObjeto">${descripcion_list[i]}</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero">
                        <p id="tipo"> Software </p>
                        <p id="sistema">${sistema_list[i]}</p>
                        <div class="checkbox">
                                    <input type="checkbox" name="disponible" id="disponible" class="checkbox">
                        </div>
                        
                        <div><button id="row_delete" onclick="delete_button('${item_list[i]}');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('${item_list[i]}');">Save</button></div>
                    </div>
                    <br>`;
        $('.div_list_users').append(the);
        console.log("lol");
    }
}


function new_div(obj){

    for(let i = 0; i < 10; i++){
            let the =`<div class="single_row_user" id="${item_list[i]}">

        
            
            <div class="checkbox">
                        <input type="checkbox" name="disponible" id="disponible" class="checkbox">
            </div>
            
            <div><button id="row_block" onclick="block_button('${item_list[i]}');">Block</button></div>
            <div><button id="row_delete" onclick="delete_button('${item_list[i]}');">Delete</button></div>
            <div><button id="row_save" onclick="save_button('${item_list[i]}');">Save</button></div>
        </div>`;
        $('.div_list_users').append(the);
        console.log("lol");
    }
}

window.onload = add_div();

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
