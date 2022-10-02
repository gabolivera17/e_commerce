let URL_PRODUCTO_SELECCIONADO = `https://japceibal.github.io/emercado-api/products/` + localStorage.getItem("prodID") + `.json`;

console.log(URL_PRODUCTO_SELECCIONADO);

function setProdID(id) {
  localStorage.setItem("prodID", id);
  console.log(localStorage.getItem("prodID"))
  window.location = "product-info.html";
}

function showProductInfo(url){

    fetch(url)
    .then(function(respuesta) {
    return respuesta.json();
    })
    .then(function(datos){

        let producto = datos;
        console.log(producto);

        let contenidoHTML = `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.images[0] + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h5>` + producto.description + `<h5>
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` productos vendidos</small> 
                        <small class="text-muted"> Precio: ` + producto.cost + ` USD</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("producto-seleccionado").innerHTML = producto.name;
        document.getElementById("contenedor-producto").innerHTML = contenidoHTML;
    })
}

showProductInfo(URL_PRODUCTO_SELECCIONADO);

let URL_COMENTARIOS_PRODUCTO = `https://japceibal.github.io/emercado-api/products_comments/` + localStorage.getItem("prodID") + `.json`;

console.log(URL_COMENTARIOS_PRODUCTO);

function showProductComments(url){

    fetch(url)
    .then(function(respuesta) {
    return respuesta.json();
    })
    .then(function(datos){

        let comments = datos;
        console.log(comments);

        let contenidoHTML

        for(let comment of comments){

        contenidoHTML = `
        <div class="card mb-4">
          <div class="card-body">
            <p>${comment.user} dice:</p>

            <div class="d-flex justify-content-between">
              <div class="d-flex flex-row align-items-center">
                <p>${comment.description}</p>
              </div>
              <div class="d-flex flex-row align-items-center">
                <p>Score: ${comment.score}</p> 
              </div>
            </div>
          </div>
        </div>
        `
        document.getElementById("contenedor-comentarios").innerHTML += contenidoHTML;
        }

    })
}

showProductComments(URL_COMENTARIOS_PRODUCTO);


function showRelatedProducts(url){

  fetch(url)
  .then(function(respuesta) {
  return respuesta.json();
  })
  .then(function(datos){

      let productosRelacionados = datos.relatedProducts;

      console.log(productosRelacionados);

      let contenidoHTML =``;

      for (let productoRelacionado of productosRelacionados){
      contenidoHTML += `
      <div class="list-group-item list-group-item-action" onclick="setProdID(${productoRelacionado.id})">
          <div class="row">
              <div class="col-3">
                  <img src="` + productoRelacionado.image + `" alt="product image" class="img-thumbnail">
              </div>
              <div class="col">
                  <div class="d-flex w-100 justify-content-between">
                      <div class="mb-1">
                      <h5>` + productoRelacionado.name + `<h5>
                      </div>
                  </div>
              </div>
          </div>
      </div>
      `
    }
      document.getElementById("divProductosRelacionados").innerHTML = contenidoHTML;
  })
}

showRelatedProducts(URL_PRODUCTO_SELECCIONADO);