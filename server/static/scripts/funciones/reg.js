
    var name1 = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    var surname = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
    var username = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
    var email  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    var emailTec  = /^[a-zA-Z0-9_.+-]+@tec.mx$/;
    var password = /^.{8,16}$/; // 4 a 16 digitos.
    var age1  = /^[0-9]{1,2}$/;


    $(document).ready(function () {
        $("#botonenvio").click(function () {
            var nombre = $("#name").val();
            var apellido = $("#surname").val();
            var usuario = $("#username").val();
            var birthdate = $("#birthdate").val();
            var organizacion = $("#organization").val();
            var correo = $("#email").val();
            var age = $("#age").val();
            var contrasena = $("#password").val();
            var contrasena2 = $("#password2").val();


            if (nombre == "" ) {
                $("#name").focus();
                $("#nameid").css("color", "red");
                return false;
            } else if (!name1.test(nombre)) {
                $("#name").focus();
                $("#nameid").css("color", "red");
                return false;
            } else if (apellido == "") {
                $("#surname").focus();
                $("#surnameid").css("color", "red");
                return false;
            } else if (!surname.test(apellido)) {
                $("#surname").focus();
                $("#surnameid").css("color", "red");
                return false;
            } else if (usuario == "") {
                $("#username").focus();
                $("#usernameid").css("color", "red");
                return false;
            } else if (!username.test(usuario)) {
                $("#username").focus();
                $("#usernameid").css("color", "red");
                return false;
            } else if (birthdate == "dd/mm/aaaa") {
                $("#birthdate").focus();
                $("#birthdateid").css("color", "red");
                return false;
            } else if (organizacion == "") {
                $("#organization").focus();
                $("#organizationid").css("color", "red");
                return false;
            } else if (correo == "") {
                $("#email").focus();
                $("#emailid").css("color", "red");
                return false;
            } else if (!email.test(correo)) {
                $("#email").focus();
                $("#emailid").css("color", "red");
                return false;
           //} else if (!emailTec.test(correo)) {
                
             //   $("#email").focus();
               // return false;
            } else if (age1 == "") {
                $("#age").focus();
                $("#ageid").css("color", "red");
                return false;
            } else if (!age1.test(age)) {
                $("#age").focus();
                $("#ageid").css("color", "red");
                return false;
            } else if (contrasena == "") {
                $("#password").focus();
                $("#passwordid").css("color", "red");
                return false;
            } else if (!password.test(contrasena)) {
                $("#password").focus();
                $("#passwordid").css("color", "red");
                return false;
            } else if (contrasena2 == "") {
                $("#password2").focus();
                $("#password2id").css("color", "red");
                return false;
            } else if (contrasena != contrasena2) {
                $("#password2").focus();
                return false;
            } else if (contrasena == contrasena2) {
                hash256();
                return true;
            } else {
                return true;
            }  
        })});

$(document).ready(function () {
    $("#formulario").on("input", function () {
        $("#nameid").css("color", "white");
        $("#surnameid").css("color", "white");
        $("#usernameid").css("color", "white");
        $("#birthdateid").css("color", "white");
        $("#organizationid").css("color", "white");
        $("#emailid").css("color", "white");
        $("#ageid").css("color", "white");
        $("#passwordid").css("color", "white");
        $("#password2id").css("color", "white");
    });
});


// hash256 

function hash256() {
    var hash = CryptoJS.SHA256($("#password").val());
    $("#password").val(hash);

}

//navbar 

