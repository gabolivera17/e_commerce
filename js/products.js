let URL_PRODUCTO_SELECCIONADO = `https://japceibal.github.io/emercado-api/cats_products/`+ localStorage.getItem("catID") + `.json`

let listaProductos = [];
console.log(listaProductos);

fetch(URL_PRODUCTO_SELECCIONADO)
.then(function(respuesta) {
    return respuesta.json();
})
.then(function(datos) {
    listaProductos = datos.products;
    console.log(listaProductos);

    let divListaAutos = document.getElementById("div-lista-productos")

    let htmlContentToAppend = "";
    for (let producto of listaProductos){
        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action">
            <div class="row">
                <div class="col-3">
                    <img src="` + producto.image + `" alt="product image" class="img-thumbnail">
                </div>
                <div class="col">
                    <div class="d-flex w-100 justify-content-between">
                        <div class="mb-1">
                        <h5>` + producto.name + `<h5>
                        <small class="text-muted"> `+ producto.description +`</small> 
                        </div>
                        <small class="text-muted">` + producto.soldCount + ` productos vendidos</small> 
                        <small class="text-muted"> Precio: ` + producto.cost + ` USD</small> 
                    </div>
                </div>
            </div>
        </div>
        `
        document.getElementById("div-lista-productos").innerHTML = htmlContentToAppend; 
    }
});
