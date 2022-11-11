let btnGuardar = document.getElementById("btn-guardar");

let inputNombre = document.getElementById("nombre").value;
let inputApellido = document.getElementById("apellido").value;
let inputTelefono = document.getElementById("telefono").value;

let alertaNombre = document.getElementById("mensaje-nombre");
let alertaApellido = document.getElementById("mensaje-apellido");
let alertaTelefono = document.getElementById("mensaje-telefono");

document.getElementById("email").value = localStorage.getItem("email-usuario");

if(localStorage.getItem("nombre-usuario") != ""){
    document.getElementById("nombre").value = localStorage.getItem("nombre-usuario");
}

if(localStorage.getItem("apellido-usuario") != ""){
    document.getElementById("apellido").value = localStorage.getItem("apellido-usuario");
}

if(localStorage.getItem("telefono-usuario") != ""){
    document.getElementById("telefono").value = localStorage.getItem("telefono-usuario");
}

if(localStorage.getItem("segundo-nombre-usuario") != ""){
    document.getElementById("segundo-nombre").value = localStorage.getItem("segundo-nombre-usuario");
}

if(localStorage.getItem("segundo-apellido-usuario") != ""){
    document.getElementById("segundo-apellido").value = localStorage.getItem("segundo-apellido-usuario");
}


btnGuardar.addEventListener("click", function(evento){

    let inputNombre = document.getElementById("nombre").value;
    let inputApellido = document.getElementById("apellido").value;
    let inputTelefono = document.getElementById("telefono").value;
    
    let segundoNombre = document.getElementById("segundo-nombre").value;
    let segundoApellido = document.getElementById("segundo-apellido").value;
    let email = document.getElementById("email").value;


    let alertaNombre = document.getElementById("mensaje-nombre");
    let alertaApellido = document.getElementById("mensaje-apellido");
    let alertaTelefono = document.getElementById("mensaje-telefono");

    if (inputNombre.length <= 0){
        evento.preventDefault();
        alertaNombre.innerHTML = "Debe ingresar un nombre";
        document.getElementById("nombre").style.border = "1px solid crimson";
    } else{
        alertaNombre.innerHTML = "";

        document.getElementById("nombre").style.border = "1px solid green";
        evento.preventDefault();
    }

    if (inputApellido.length <= 0){
        evento.preventDefault();
        alertaApellido.innerHTML = "Debe ingresar un apellido";
        document.getElementById("apellido").style.border = "1px solid crimson";
    } else{
        alertaApellido.innerHTML = "";

        document.getElementById("apellido").style.border = "1px solid green";
        evento.preventDefault();
    }

    if (inputTelefono.length <= 0){
        evento.preventDefault();
        alertaTelefono.innerHTML = "Debe ingresar un teléfono";
        document.getElementById("telefono").style.border = "1px solid crimson";
    } else{
        alertaTelefono.innerHTML = "";

        document.getElementById("telefono").style.border = "1px solid green";
        evento.preventDefault();
    }

    function autoRefresh() {
        window.location = window.location.href;
    }



    if(!(alertaNombre.innerHTML == "") || !(alertaApellido.innerHTML == "") || !(alertaTelefono.innerHTML == "")){
        evento.preventDefault();
    } else{
        localStorage.setItem("nombre-usuario",inputNombre);
        localStorage.setItem("apellido-usuario",inputApellido);
        localStorage.setItem("telefono-usuario",inputTelefono);
        localStorage.setItem("segundo-nombre-usuario",segundoNombre);
        localStorage.setItem("segundo-apellido-usuario",segundoApellido);
        localStorage.setItem("email-usuario",email);

        document.getElementById("mensaje-exito").innerHTML = "Datos guardados con éxito";
        setTimeout(autoRefresh, 2000);
    }
    

    
})