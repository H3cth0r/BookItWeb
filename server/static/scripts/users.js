
for (i = 0; i < usersData.length; i++) {
    var user = usersData[i];
    var username = user.username;
    var firstName = user.firstName;
    var lastName = user.lastName;
    var birthDate = user.birthDate;
    var email = user.email;
    var countryId = user.countryId;
    var userID = user.userId;
    var admin = user.admin;

    let the = `<div class="single_row_user" id="` + userID + `">
                    <p id="userid">` + userID + `</p>
                    <input type="text" value="` + firstName + `" id="name">
                    <input type="text" value="` + username + `" id="username">
                    <input type="text" value="` + lastName + `" id="lastName">
                    <input type="date" value="` + birthDate + `" id="birthDate">
                    <input type="text" value="` + email + `" id="email">
                    <input type="text" value="` + countryId + `" id="countryId">
                    <input type="checkbox" id="admin" value="`+admin+`>
                    <div><button id="row_block" onclick="block_button('` + userID + `');">Block</button></div>
                    <div><button id="row_delete" onclick="delete_button('` + userID + `');">Delete</button></div>
                    <div><button id="row_save" onclick="save_button('` + userID + `');">Save</button></div>
                    
                </div>
                <br>`;
    $('.div_list_users').append(the);
    
}





function move_rows(id_val){
    $(`#${id_val}`).remove();
}
// div div objs display: none
// animation make smaller row div
// delete the div
function delete_button(id_val){
    if (confirm ("¿Estás seguro de que quieres eliminar este objeto?")) {
    anime({
        targets: `#${id_val}`,
        translateX: 1500,
        easing: "easeInOutCubic"
    });
    setTimeout(move_rows, 800, id_val);
    $.ajax({
        url: 'api/edit/user', //cambiar esto por la ruta del servidor y añadir bien el json
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
    
    $.ajax({
        url: 'api/edit/user', //cambiar esto por la ruta del servidor y añadir bien el json
        type: 'POST',
        data: JSON.stringify({ "userId" : userID , "firstName" : firstName, "lastName" : lastName, "birthDate" : birthDate, "email" : email, "countryId" : countryId, "admin" : admin }),
        contentType: "application/json",
        dataType: "json",
        success: function(data){
            alert(data);
        }
    });
    
}
}
