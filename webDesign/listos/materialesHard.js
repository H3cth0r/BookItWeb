function add_div(){
    var item_list = ["imac 24", "imac 27", "imac 32", "imac 36", "imac 40", "imac 44", "imac 48", "imac 52", "imac 56", "imac 60"];
    var descripcion_list = ["Computadora iMac de 24 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 27 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 32 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 36 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 40 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 44 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 48 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 52 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 56 con procesador M1 y sistema operativo MacOs Monterey", "Computadora iMac de 60 con procesador M1 y sistema operativo MacOs Monterey"];
    var sistema_list = ["windows", "windows", "windows", "windows", "windows", "windows", "windows", "windows", "windows", "windows"];
    var prefijos_list = ["PC-01", "PC-02", "PC-03", "PC-04", "PC-05", "PC-06", "PC-07", "PC-08", "PC-09", "PC-10"];
    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${item_list[i]}">
      
                        <p id="prefijo">${prefijos_list[i]}</p>
                        <p id="nombreObjeto">${item_list[i]}</p>
                        <p id="descripcionObjeto">${descripcion_list[i]}</p>
                        <input type="number" name="cantidad" id="cantidad" class="numero">
                        <p id="tipo"> Hardware </p>
                        <p id="tipo">${sistema_list[i]}</p>
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
            let the = `<div class="single_row_user" id="${item_list[i]}">
      
            <p id="prefijo">${prefijos_list[i]}</p>
            <p id="nombreObjeto">${item_list[i]}</p>
            <p id="descripcionObjeto">${descripcion_list[i]}</p>
            <input type="number" name="cantidad" id="cantidad" class="numero">
            <p id="tipo"> Hardware </p>
            <p id="tipo">${sistema_list[i]}</p>
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
