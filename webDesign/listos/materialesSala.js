function add_div(){
    var item_list = ["sala1", "sala2", "sala3", "sala4", "sala5", "sala6", "sala7", "sala8", "sala9", "sala10"];
    var descripcion_list = ["esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica" , "esta es una descripcion generica"];
    var etiqueta_list = ["CDT", "CDT", "CDT", "CDT", "CDT", "CDT", "CDT", "CDT", "CDT", "CDT" ];
    var localizacion_list = ["esta es una localizacion generica", "esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica","esta es una localizacion generica"];
    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${item_list[i]}">  
                        <p id="prefijo">${etiqueta_list[i]}</p>
                        <p id="nombreObjeto">${item_list[i]}</p>

                        <p id="descripcionObjeto">${descripcion_list[i]}</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero">
                        <p id="tipo"> ${localizacion_list[i]} </p>
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
