document.addEventListener("DOMContentLoaded", function(){
    document.getElementById("autos").addEventListener("click", function() {
        localStorage.setItem("catID", 101);
        // localStorage.setItem("categoria-seleccionada","Autos")
        window.location = "products.html"
    });
    document.getElementById("juguetes").addEventListener("click", function() {
        localStorage.setItem("catID", 102);
        // localStorage.setItem("categoria-seleccionada","Juguetes")
        window.location = "products.html"
    });
    document.getElementById("muebles").addEventListener("click", function() {
        localStorage.setItem("catID", 103);
        // localStorage.setItem("categoria-seleccionada","Muebles")
        window.location = "products.html"
    });
});