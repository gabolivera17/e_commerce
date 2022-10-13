let URL_CARRITO = `https://japceibal.github.io/emercado-api/user_cart/25801.json`;

let cantidadArticulo = 1;

let precioArticulo = 1;

function showCartInfo(url){

    fetch(url)
    .then(function(respuesta) {
    return respuesta.json();
    })
    .then(function(datos){

        let carrito = datos.articles;
        console.log(carrito);

        for(let articulo of carrito){

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
                onclick="this.parentNode.querySelector('input[type=number]').stepDown(); (cantidadArticulo--); recalcularSubtotal()">
                <i class="fas fa-minus"></i>
              </button>

              <input id="form1" min="0" name="quantity" value=${cantidadArticulo} type="number"
                class="form-control form-control-sm" />

              <button class="btn btn-link px-2"
                onclick="this.parentNode.querySelector('input[type=number]').stepUp(); (cantidadArticulo++); recalcularSubtotal()">
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
    }
    })
}

showCartInfo(URL_CARRITO);

function recalcularSubtotal(){
    if(cantidadArticulo >= 0){
    document.getElementById("subtotal").innerHTML = "USD " + cantidadArticulo * precioArticulo;
    }
    else{
        cantidadArticulo = 0;
    }
}