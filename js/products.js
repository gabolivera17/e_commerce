let URL_CATEGORIA_SELECCIONADA = `https://japceibal.github.io/emercado-api/cats_products/`+ localStorage.getItem("catID") + `.json`;

let listaProductos = [];
console.log(listaProductos);

let precioMin = undefined;
let precioMax = undefined;

const ORDER_ASC_BY_COST = "MinToMax";
const ORDER_DESC_BY_COST = "MaxToMin";
const ORDER_BY_PROD_REL = "Rel.";

let currentSortCriteria = ORDER_ASC_BY_COST;

function setProdID(id) {
    localStorage.setItem("prodID", id);
    console.log(localStorage.getItem("prodID"))
    window.location = "product-info.html";
}


function showProductList(URL){

fetch(URL)
.then(function(respuesta) {
    return respuesta.json();
})
.then(function(datos) {
    listaProductos = datos.products;
    console.log(listaProductos);

    function sortProducts(criteria, array){
        let result = [];
        if (criteria === ORDER_ASC_BY_COST)
        {
            result = array.sort(function(a, b) {
                if ( a.cost < b.cost ){ return -1; }
                if ( a.cost > b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_DESC_BY_COST){
            result = array.sort(function(a, b) {
                if ( a.cost > b.cost ){ return -1; }
                if ( a.cost < b.cost ){ return 1; }
                return 0;
            });
        }else if (criteria === ORDER_BY_PROD_REL){
            result = array.sort(function(a, b) {
                let aRel = parseInt(a.soldCount);
                let bRel = parseInt(b.soldCount);
    
                if ( aRel > bRel ){ return -1; }
                if ( aRel < bRel ){ return 1; }
                return 0;
            });
        }
        return result;
    }

    listaProductos = sortProducts(currentSortCriteria,listaProductos);
    
    let htmlContentToAppend = "";
    for (let producto of listaProductos){

        if (((precioMin == undefined) || (precioMin != undefined && parseInt(producto.cost) >= precioMin)) &&
            ((precioMax == undefined) || (precioMax != undefined && parseInt(producto.cost) <= precioMax))){

        htmlContentToAppend += `
        <div class="list-group-item list-group-item-action cursor-active" onclick="setProdID(${producto.id})">
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

showProductList(URL_CATEGORIA_SELECCIONADA);


document.getElementById("filtrar-por-precio").addEventListener("click", function(){
    //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
    precioMin = document.getElementById("precio-min").value;
    precioMax = document.getElementById("precio-max").value;

    console.log(precioMin);
    console.log(precioMax);

    if ((precioMin != undefined) && (precioMin != "") && (parseInt(precioMin)) >= 0){
        precioMin = parseInt(precioMin);
    }
    else{
        precioMin = undefined;
    }

    if ((precioMax != undefined) && (precioMax != "") && (parseInt(precioMax)) >= 0){
        precioMax = parseInt(precioMax);
    }
    else{
        precioMax = undefined;
    }

    showProductList(URL_CATEGORIA_SELECCIONADA);
});


document.getElementById("sortMinToMax").addEventListener("click", function(){
    currentSortCriteria = ORDER_ASC_BY_COST;
    showProductList(URL_CATEGORIA_SELECCIONADA);
});

document.getElementById("sortMaxToMin").addEventListener("click", function(){
    currentSortCriteria = ORDER_DESC_BY_COST;
    showProductList(URL_CATEGORIA_SELECCIONADA);
});

document.getElementById("sortByRelevance").addEventListener("click", function(){
    currentSortCriteria = ORDER_BY_PROD_REL;
    showProductList(URL_CATEGORIA_SELECCIONADA);
});





