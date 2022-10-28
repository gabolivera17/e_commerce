let URL_CARRITO = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

let cantidadArticulo = 1;

let precioArticulo = 1;

function showCartInfo(url) {

  fetch(url)
    .then(function (respuesta) {
      return respuesta.json();
    })
    .then(function (datos) {

      let carrito = datos.articles;
      console.log(carrito);

      for (let articulo of carrito) {

        cantidadArticulo = articulo.count;
        precioArticulo = articulo.unitCost

        let contenidoHTML = `
        <div class="card rounded-3 mb-4">
        <div class="card-body p-4">
          <div class="row d-flex justify-content-between align-items-center">
            <div class="col-md-2 col-lg-2 col-xl-2">
              <img
                src="${articulo.image}"
                class="img-fluid rounded-3" alt="Foto Artículo">
            </div>
            <div class="col-md-3 col-lg-3 col-xl-3">
              <p class="lead fw-normal mb-2">${articulo.name}</p>
            </div>
            <div class="col-md-3 col-lg-3 col-xl-2 d-flex">
              <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepDown(); (cantidadArticulo--); recalcularMontos()">
                <i class="fas fa-minus"></i>
              </button>

              <input id="form1" min="1" name="quantity" value=${cantidadArticulo} type="number"
                class="form-control form-control-sm" />

              <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp(); (cantidadArticulo++); recalcularMontos()">
                <i class="fas fa-plus"></i>
              </button>
            </div>
            <div class="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
              <h5 class="mb-0">USD ${articulo.unitCost}</h5>
            </div>
            <div class="col-md-2 col-lg-2 col-xl-2 text-end">
              <p class="lead fw-normal mb-3" id="subtotal">USD ${(cantidadArticulo * precioArticulo)}</p>
            </div>
          </div>
        </div>
        </div>    
        `
        document.getElementById("articulos-carrito").innerHTML = contenidoHTML;
        document.getElementById("subtotal-carrito").innerHTML = "USD " + cantidadArticulo * precioArticulo;
        document.getElementById("costo-de-envio").innerHTML = "USD " + Math.round((cantidadArticulo * precioArticulo) * 0.15);
        document.getElementById("total-carrito").innerHTML = "USD " + Math.round((cantidadArticulo * precioArticulo) + Math.round((cantidadArticulo * precioArticulo) * 0.15))
      }
    })
}

showCartInfo(URL_CARRITO);

let envioPremium = document.getElementById("premium");
let envioExpress = document.getElementById("express");
let envioStandard = document.getElementById("standard");

let costoEnvio;

function recalcularMontos() {

  if (envioPremium.checked) {
    costoEnvio = Math.round((cantidadArticulo * precioArticulo) * 0.15);
    document.getElementById("costo-de-envio").innerHTML = "USD " + costoEnvio;
  }
  else if (envioExpress.checked) {
    costoEnvio = Math.round((cantidadArticulo * precioArticulo) * 0.07);
    document.getElementById("costo-de-envio").innerHTML = "USD " + costoEnvio;
  }
  else {
    costoEnvio = Math.round((cantidadArticulo * precioArticulo) * 0.05);
    document.getElementById("costo-de-envio").innerHTML = "USD " + costoEnvio;
  }

  if (cantidadArticulo >= 1) {
    document.getElementById("subtotal").innerHTML = "USD " + cantidadArticulo * precioArticulo;
    document.getElementById("subtotal-carrito").innerHTML = " USD " + cantidadArticulo * precioArticulo;
  }
  else {
    cantidadArticulo = 1;
  }

  document.getElementById("total-carrito").innerHTML = "USD " + Math.round((cantidadArticulo * precioArticulo) + costoEnvio);
}

function pagoTarjeta(){

  document.getElementById("form-tarjeta").disabled = false;
  
  document.getElementById("form-transferencia-bancaria").disabled = true;
}

function pagoCuentaBancaria(){
  
  document.getElementById("form-tarjeta").disabled = true;
  
  document.getElementById("form-transferencia-bancaria").disabled = false;
}




document.getElementById("boton-pagar").addEventListener("click",function(evento){

  let incompleto = false;

  let inputCalle = document.getElementById("input-calle").value;
  let inputNumero = document.getElementById("input-numero").value;
  let inputEsquina = document.getElementById("input-esquina").value;

  document.getElementById("mensaje-calle").innerHTML = "";
  document.getElementById("mensaje-numero").innerHTML = "";
  document.getElementById("mensaje-esquina").innerHTML = "";
  document.getElementById("mensaje-envio").innerHTML = "";
  document.getElementById("mensaje-pago").innerHTML = "";

  if (inputCalle.length <= 0) {
    evento.preventDefault();
    document.getElementById("mensaje-calle").innerHTML = "Debe ingresar una calle";
    document.getElementById("input-calle").style.border = "1px solid crimson";
    incompleto = true;
  }
  else {
    document.getElementById("input-calle").style.border = "2px solid green";
    incompleto = false;
  }

  if (inputNumero.length <= 0) {
    evento.preventDefault();
    document.getElementById("mensaje-numero").innerHTML = "Debe ingresar un número";
    document.getElementById("input-numero").style.border = "1px solid crimson";
    incompleto = true;
  }
  else{
    document.getElementById("input-numero").style.border = "2px solid green";
    incompleto = false;
  }

  if (inputEsquina.length <= 0) {
    evento.preventDefault();
    document.getElementById("mensaje-esquina").innerHTML = "Debe ingresar una esquina";
    document.getElementById("input-esquina").style.border = "1px solid crimson";
    incompleto = true;
  }
  else{
    document.getElementById("input-esquina").style.border = "2px solid green";
    incompleto = false;
  }

  if (!envioPremium.checked && !envioExpress.checked && !envioStandard.checked){
    evento.preventDefault();
    document.getElementById("mensaje-envio").innerHTML = "Debe seleccionar un tipo de envío";
    document.getElementById("carta-envio").style.border = "1px solid crimson";
    incompleto = true;
  }
  else{
    document.getElementById("carta-envio").style.border = "2px solid green";
    incompleto = false;
  }

  if(!document.getElementById("tarjeta-de-credito").checked && !document.getElementById("transferencia-bancaria").checked){
    evento.preventDefault();
    document.getElementById("mensaje-pago").innerHTML = "Debe seleccionar una forma de pago";
    incompleto = true;
  }
  else{
    incompleto = false;
  }

  if(incompleto){
    document.getElementById("mensaje-compra").innerHTML = "Por favor completar campos para continuar";
    document.getElementById("mensaje-compra").style.color = "crimson";
  }
  else{
    alert(`Su compra se realizó correctamente.
Presione aceptar para volver al inicio`);

    window.location.href = "index2.html"
  }
})

