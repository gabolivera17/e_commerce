let URL_PRODUCTO_SELECCIONADO = `https://japceibal.github.io/emercado-api/cats_products/`+ localStorage.getItem("catID") + `.json`;

let listaProductos = [];
console.log(listaProductos);

let precioMin = undefined;
let precioMax = undefined;


function showProductList(URL){

fetch(URL)
.then(function(respuesta) {
    return respuesta.json();
})
.then(function(datos) {
    listaProductos = datos.products;
    console.log(listaProductos);

    let htmlContentToAppend = "";
    for (let producto of listaProductos){

        if (((precioMin == undefined) || (precioMin != undefined && parseInt(producto.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(producto.cost) <= precioMax))){

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
        }

        document.getElementById("div-lista-productos").innerHTML = htmlContentToAppend; 
    }
});

}

showProductList(URL_PRODUCTO_SELECCIONADO);


document.getElementById("filtrar-por-precio").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    precioMin = document.getElementById("precio-min").value;
    precioMax = document.getElementById("precio-max").value;

    console.log(precioMin);
    console.log(precioMax);

    showProductList(URL_PRODUCTO_SELECCIONADO);
});


