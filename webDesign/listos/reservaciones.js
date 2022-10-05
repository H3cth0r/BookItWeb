function add_div(){
    var username_list = ["user1", "user2", "user3", "user4", "user5", "user6", "user7", "user8", "user9", "user10"];
    var objeto_list_id = ["objeto1", "objeto2", "objeto3", "objeto4", "objeto5", "objeto6", "objeto7", "objeto8", "objeto9", "objeto10"];
    var fecha_inicio_list = ["11/10/2022","11/11/2022", "11/12/2022", "11/13/2022", "11/14/2022", "11/15/2022", "11/16/2022", "11/17/2022", "11/18/2022", "11/19/2022"];
    var fecha_fin_list = ["11/10/2022","11/11/2022", "11/12/2022", "11/13/2022", "11/14/2022", "11/15/2022", "11/16/2022", "11/17/2022", "11/18/2022", "11/19/2022"];

    for(let i = 0; i < 10; i++){
            let the = `<div class="single_row_user" id="${username_list[i]}">
            &nbsp <p>${i+1}</p>&nbsp
                        <p>${username_list[i]}</p>
                        <p>${objeto_list_id[i]}</p>
                        <p>${fecha_inicio_list[i]}</p>
                        <p>${fecha_fin_list[i]}</p>
                        <div><button id="row_delete" onclick="delete_button('${objeto_list_id[i]}');">Delete</button></div>
                        <div><button id="row_save" onclick="save_button('${objeto_list_id[i]}');">Save</button></div>
                    </div>
                    <br>`;
        $('.div_list_users').append(the);
        console.log("lol");
    }
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
