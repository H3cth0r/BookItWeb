var name = userData.firstName;
var lastName = userData.lastName;
var username = userData.username;
var birthDate = userData.birthDate;
var organization = userData.organization;
var email = userData.email;
var ocupation = userData.ocupation;
var name1 = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
var surname = /^[a-zA-ZÀ-ÿ\s]{1,40}$/; // Letras y espacios, pueden llevar acentos.
var username = /^[a-zA-Z0-9\_\-]{4,16}$/; // Letras, numeros, guion y guion_bajo
var email  = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
var emailTec  = /^[a-zA-Z0-9_.+-]+@tec.mx$/;
var password = /^.{8,16}$/; // 4 a 16 digitos.




let the = `<h3>{</h3>
            <h3>&nbsp "register" : {</h3>
                <h3 class="reg">&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp"user" : {</h3>
        <div class="forms">
        <form action="" method="post" id="formulario" action=>

         
          <div class="form-group">
              <label for="name" id="nameid">"name":{</label>
              <input type="text" class="form-control" id="name" name="name" placeholder="name">
          </div>
          <div class="form-group" >
              <label for="surname" id="surnameid">"surname":{</label>
              <input type="text" class="form-control" id="surname" name="surname" placeholder="surname">
          </div>
          <br>
          <br>
          <div class="form-group">
              <label for="username" id="usernameid">"username":{</label>
              <input type="text" class="form-control" id="username" name="username" placeholder="username">
          </div>
          <div class="form-group">
              <label for="birthdate" id="birthid">"birth":{</label>
              <input type="date" class="form-control" id="birthdate" name="birth" placeholder="birth" value="1995-01-01">
          </div>
          <div class="form-group" >
              <label for="organization" id="organizationid">"Organization":{</label>
              <input type="text" class="form-control" id="organization" name="organization" placeholder="organization">
          </div>
            
          <div class="form-group" >
              <label for="email" id="emailid">"mail":{</label>
              <input type="email" class="form-control" id="email" name="email" placeholder="email">
          </div>
          <div class="form-group">
              <label for="age" id="ageid">"ocupation":{</label>
              <input type="text" class="form-control" id="age" name="age" placeholder="ocupation">
          </div>
          <br>
          <br>
          <br>
          <div class="form-group">
              <label for="password" id="passwordid">"password":{</label>
              <input type="password" class="form-control" id="password" name="password" placeholder="// 8 length password">
          </div>
          <div class="form-group">
              <label for="password2" id="passwordid2">"password":{</label>
              <input type="password" class="form-control" id="password2" name="password" placeholder="password">
          </div>
      </form>
        <br>    
        <h3>},</h3>
        
    </div>
    <h3>}</h3>

        <div class="contenedor_boton">
        <button type="submit" class="btn btn-primary" id="botonenvio">SEND</button>
       
    </div>`;
    
    ('#infoUsuario').append(the);

    $('#botonenvio').click(function(){
        var name = $('#name').val();
        var surname = $('#surname').val();
        var username = $('#username').val();
        var birth = $('#birthdate').val();
        var organization = $('#organization').val();
        var email = $('#email').val();
        var age = $('#age').val();
        var password = $('#password').val();
        var password2 = $('#password2').val();
        switch (true) {
            case (nombre == ""):
                $("#name").focus();
                $("#nameid").css("color", "red");
            case (!name1.test(nombre)):
                $("#name").focus();
                $("#nameid").css("color", "red");
            case (apellido == ""):
                $("#surname").focus();
                $("#surnameid").css("color", "red");
            case (!surname.test(apellido)):
                $("#surname").focus();
                $("#surnameid").css("color", "red");
            case (usuario == ""):
                $("#username").focus();
                $("#usernameid").css("color", "red");
            case (!username.test(usuario)):
                $("#username").focus();
                $("#usernameid").css("color", "red");
            case (birthdate == ""):
                $("#birthdate").focus();
                $("#birthid").css("color", "red");
            case (organizacion == ""):
                $("#organization").focus();
                $("#organizationid").css("color", "red");
            case (correo == ""):
                $("#email").focus();
                $("#emailid").css("color", "red");
            case (!email.test(correo)):
                $("#email").focus();
                $("#emailid").css("color", "red");
            case (age == ""):
                $("#age").focus();
                $("#ageid").css("color", "red");
            case (contrasena != "" && !password.test(contrasena)):
                $("#password").focus();
                $("#passwordid").css("color", "red");
            
            case (contrasena2 == "" || contrasena != contrasena2 && !password.test(contrasena2)): 
                $("#password2").focus();
                $("#passwordid2").css("color", "red");
            default:
                var data = {
                    "name": name,
                    "surname": surname,
                    "username": username,
                    "birth": birth,
                    "organization": organization,
                    "email": email,
                    "age": age,
                    "password": password,
                    "password2": password2
                };
                console.log(data);
                $.ajax({
                    url: '/edit/userInfo', //cambiarurl donde se envia la peticion 
                    type: 'POST',
                    data: data,
                    success: function(response){
                        console.log(response);
                    }
                });
            }
        });