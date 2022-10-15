var name1 = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
var surname = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
var username = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
var email  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
var emailTec  = /^[a-zA-Z0-9_.+-]+@tec.mx$/;
var password = /^.{8,16}$/; // 4 a 16 digitos.



$(document).ready(function () {
    $("#sendButton").click(function () {
        var nombre = $("#name").val();
        var apellido = $("#surname").val();
        var usuario = $("#username").val();
        var birthdate = $("#birth").val();
        var organizacion = $("#organization").val();
        var correo = $("#email").val();
        var ocupation = $("#ocupation").val();
        var countryId = $("#countryId").val();
        var contrasena = $("#password").val();
        var contrasena2 = $("#password2").val();


        switch (true) {
            case (nombre == ""):
                $("#name").focus();
                $("#nameId").css("color", "red");
            case (!name1.test(nombre)):
                $("#name").focus();
                $("#nameId").css("color", "red");
            case (apellido == ""):
                $("#surname").focus();
                $("#surnameId").css("color", "red");
            case (!surname.test(apellido)):
                $("#surname").focus();
                $("#surnameId").css("color", "red");
            case (usuario == ""):
                $("#username").focus();
                $("#usernameId").css("color", "red");
            case (!username.test(usuario)):
                $("#username").focus();
                $("#usernameId").css("color", "red");
            case (birthdate == ""):
                $("#birthdate").focus();
                $("#birthId").css("color", "red");
            case (organizacion == ""):
                $("#organization").focus();
                $("#organizationId").css("color", "red");
            case (correo == ""):
                $("#email").focus();
                $("#emailId").css("color", "red");
            case (!email.test(correo)):
                $("#email").focus();
                $("#emailId").css("color", "red");
            case (ocupation == ""):
                $("#ocupation").focus();
                $("#ocupationId").css("color", "red");
            case (contrasena == ""):
                $("#password").focus();
                $("#passwordId").css("color", "red");
            case (!password.test(contrasena)):
                $("#password").focus();
                $("#passwordId").css("color", "red");
            case (contrasena2 == ""):
                $("#password2").focus();
                $("#passwordId2").css("color", "red");
            case (!password.test(contrasena2)):
                $("#password2").focus();
                $("#passwordId2").css("color", "red");
            case (contrasena != contrasena2):
                $("#password2").focus();
                $("#passwordId2").css("color", "red");
            default:
                /*
                    var data = {
                        "firstName": nombre,
                        "lastName": apellido,
                        "username": usuario,
                        "birthDate": birthdate,
                        "organization": organizacion,
                        "email": correo,
                        "ocupation": ocupation,
                        "countryId": 1,
                        "hashPassword": contrasena
                    };*/
                    var data = {
                        "username": usuario,
                        "firstName": nombre,
                        "lastName": apellido,
                        "birthDate": birthdate,
                        "organization": organizacion,
                        "email": correo,
                        "ocupation": ocupation,
                        "countryId": countryId,
                        "hashPassword": contrasena
}
            
                    $.ajax({
                        type: "POST",
                        url: "/api/register",
                        data: JSON.stringify(data),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: function (data) {
                            window.location.href = "/register/verifying";
                        },
                        failure: function (errMsg) {
                            alert(errMsg);
                        }
                    });
                return true;
        }
    });
});




$(document).ready(function () {
$(".form-container").on("input", function () {
    $("#nameId").css("color", "white");
    $("#surnameId").css("color", "white");
    $("#usernameId").css("color", "white");
    $("#birthdateId").css("color", "white");
    $("#organizationId").css("color", "white");
    $("#emailId").css("color", "white");
    $("#ocupationId").css("color", "white");
    $("#passwordId").css("color", "white");
    $("#passwordId2").css("color", "white");
});
});
