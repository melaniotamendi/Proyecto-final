const autos = "https://japceibal.github.io/emercado-api/cats_products/101.json";

getJSONData = function(url) {
    let result = {};
return fetch(url)
      .then(response => response.ok ? response.json() : Promise.reject(Error(response.statusText)))
      .then(response => ({ status: 'ok', data: response }))
      .catch(error => ({ status: 'error', data: error }));
  }

document.addEventListener("DOMContentLoaded", function() {
    getJSONData(autos).then(function(respObj) {
        if (respObj.status == "ok") {
            console.log(respObj.data.products);
            mostrarAutos(respObj.data.products);
        }
    });
});