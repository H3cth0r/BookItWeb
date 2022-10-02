function add_div(){
    var username_list = ["elcarlitos", "elpepino", "elchavo", "elmalo", 
                        "elcalvo", "elcarro", "eldato", "elpelo", "elchato", "elgato"];


    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${username_list[i]}">

                        <div><p id="idUser">${i+1}</p></div>
                        <div><input type="text" id="row_name"></div>
                        <div><p id="row_username">${username_list[i]}</p></div>
                        <div><p id="row_mail">${username_list[i]}@tec.mx</p></div>
                        
                        <div><input type="date" id="row_birth"></div>
                        <div><input type="date" id="row_create"></div>
                        <div><p id="row_country">Peru</p></div>
                        
                        <div class="checkbox">
                                    <input type="checkbox" name="admin" id="admin" class="checkbox">
                        </div>
                        
                        <div><button id="row_block" onclick="block_button('${username_list[i]}');">Block</button></div>
                        <div><button id="row_delete" onclick="delete_button('${username_list[i]}');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('${username_list[i]}');">Save</button></div>
                    </div>`;
        $('.div_list_users').append(the);
        
        console.log("lol");
    }
}


function new_div(obj){

    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${username_list[i]}">

            <div><p id="idUser">${i+1}</p></div>
            <div><input type="text" id="row_name"></div>
            <div><p id="row_username">${username_list[i]}</p></div>
            <div><p id="row_mail">${username_list[i]}@tec.mx</p></div>
            
            <div><input type="date" id="row_birth"></div>
            <div><input type="date" id="row_create"></div>
            <div><p id="row_country">Peru</p></div>
            
            <div class="checkbox">
                        <input type="checkbox" name="admin" id="admin" class="checkbox">
            </div>
            
            <div><button id="row_block" onclick="block_button('${username_list[i]}');">Block</button></div>
            <div><button id="row_delete" onclick="delete_button('${username_list[i]}');">Delete</button></div>
            <div><button id="row_save" onclick="save_button('${username_list[i]}');">Save</button></div>
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
