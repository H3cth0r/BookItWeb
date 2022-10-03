function add_div(){
    var item_list = ["imac 24", "imac 27", "imac 32", "imac 36", "imac 40", "imac 44", "imac 48", "imac 52", "imac 56", "imac 60"];
    var descripcion_list = ["Computadora iMac de 24 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 27 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 32 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 36 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 40 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 44 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 48 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 52 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 56 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 60 con procesador M1 y sistema operativo MacOs Monterey"];

    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${item_list[i]}">

                        <p id="nombreObjeto">${item_list[i]}</p>
                        <p id="descripcionObjeto">${descripcion_list[i]}</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero">
                        <select name="tipo" id="tipo">
                            <option value="1">Hardware</option>
                            <option value="2">Software</option>
                            <option value="3">Espacio</option>
                        </select>
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
