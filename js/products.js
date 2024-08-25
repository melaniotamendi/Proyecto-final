document.addEventListener("DOMContentLoaded", function() {
    getJSONData(autos).then(function(respObj) {
        if (respObj.status == "ok") {
            console.log(respObj.data.products);
            mostrarAutos(respObj.data.products);
        }
    });
});