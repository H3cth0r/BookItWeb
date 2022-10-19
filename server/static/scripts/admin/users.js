//import jwt_decode from "jwt-decode";

for (i = 0; i < users.length; i++) {
    var user = users[i];
    var username = user.username;
    var firstName = user.firstName;
    var lastName = user.lastName;
    var birthDate = user.birthDate;
    var email = user.email;
    var countryId = user.countryId;
    var userID = user.userId;
    var admin = user.admin;
    var nacimiento = birthDate.split(" ");

    let the = `<div class="single_row_user" id="` + userID + `">
                    <p id="userid">` + userID + `</p>
                    <input type="text" value="` + firstName + `" id="name">
                    <input type="text" value="` + lastName + `" id="lastName">
                    <input type="text" value="` + username + `" id="username">
                    <input type="text" value="` + email + `" id="email">
                    <input type="date" value="` + nacimiento[0] + `" id="birthDate">
                    <input type="text" value="` + countryId + `" id="countryId">
                    <div class="checkbox" id="chechboxid">
                                    <input type="checkbox" name="admin" id="admin`+userID+`" value="true">
                        </div>
                    <div><button id="row_block" onclick="block_button('` + userID + `');">Block</button></div>
                    <div><button id="row_delete" onclick="delete_button('` + userID + `');">Delete</button></div>
                    <div><button id="row_save" onclick="save_button('` + userID + `');">Save</button></div>
                    
                </div>
                <br>`;
    $('#contenedortodo').append(the);
    blockAdminButton(userID);
    checkAdmin( admin, userID);
}





function move_rows(id_val){
    $(`#${id_val}`).remove();
}
function adminLevel (id_val){
    var admin = 0;
    var users = document.cookie.split("=");
    var token = users[1];
    
    var decoded = parseJwt(token);
  
    if (decoded.admin != 2 && document.getElementById(`admin`+id_val).checked){
        admin = 1; 
    }
    else if (decoded.admin == 2 && document.getElementById(`admin`+id_val).checked){
        admin = 2;
    }
    else if (decoded.admin == 2 && !document.getElementById(`admin`+id_val).checked){
        admin = 2;
    }
    else if (decoded.admin != 2 && !document.getElementById(`admin`+id_val).checked){
        admin = 0;
    }
    return admin;
}
// div div objs display: none
// animation make smaller row div
// delete the div
function delete_button(id_val){
    if (confirm ("¿Estás seguro de que quieres eliminar este objeto?")) {
    setTimeout(move_rows, 800, id_val);
    $.ajax({
        url: '/api/deleteUser', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "userId" : userID }),
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    });
}
}

function save_button(id_val){
    if (confirm ("¿Estás seguro de que quieres guardar los cambios?")) {
        adminSend = adminLevel(id_val);
        console.log(adminSend);
    $.ajax({
        url: 'api/edit/user', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "userId" : userID , "firstName" : firstName, "lastName" : lastName, "birthDate" : birthDate, "email" : email, "countryId" : countryId, "admin" : adminSend }),
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    });
    
}
}

function block_button(id_val){
    if (confirm ("¿Estás seguro de que quieres bloquear este usuario?")) {
    
    $.ajax({
        url: 'api/block/user', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "userId" : userID }),
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    });
}
}
function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

function blockAdminButton(id_val){
    var users = document.cookie.split("=");
    var token = users[1];
   
    var decoded = parseJwt(token);
  
    if (decoded.admin != 2){
        document.getElementById(`admin`+id_val).disabled = true;
    }
}

function checkAdmin(admin, id_val){
    if (admin > 0){
        document.getElementById(`admin`+id_val).checked = true;
    }
}
$(document).ready(function(){
    
});
