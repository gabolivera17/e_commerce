document.getElementById('formulario').addEventListener('submit', function(evento) {

    let contraseña = document.getElementById("password1").value;
    let email = document.getElementById("email").value;


    if((contraseña.length === 0) || (email.length === 0)){
        console.log("No se pudo loguear");
        alert("Deben ingresarse datos válidos");
        evento.preventDefault();
    }
    else{
        evento.preventDefault();
        window.location.href = "index2.html";
    }

 


});