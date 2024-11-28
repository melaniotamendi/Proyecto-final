// URLs apuntando al servidor local
const CATEGORIES_URL = "http://localhost:3600/cats"; // Devuelve todos los productos
const CATS_ID_URL = "http://localhost:3600/cats_products/";// Debe incluir el ID al final
const PRODUCT_INFO_URL = "http://localhost:3600/products"; 
const PRODUCT_ID_URL = "http://localhost:3600/products/"; //Debe incluir el ID al final



document.addEventListener("DOMContentLoaded", function () {
  // Verificar si el usuario está logueado
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    // Redirige al login si no hay usuario logueado
    window.location.href = "login.html";
  } else {
    console.log("Usuario logueado:", loggedInUser);
  }
});

// Funciones para manejar el spinner
let showSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "block";
};

let hideSpinner = function () {
  document.getElementById("spinner-wrapper").style.display = "none";
};

// Función genérica para realizar solicitudes y manejar errores
let getJSONData = async function (url) {
  let result = {};
  showSpinner();
  try {
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      result.status = "ok";
      result.data = data;
    } else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    result.status = "error";
    result.data = error;
    console.error("Error al obtener datos:", error);
  } finally {
    hideSpinner();
  }
  return result;
};

// Ejemplo de cómo usar las URLs y obtener datos
(async function () {
  // Obtener todos los productos
  const categoriesData = await getJSONData(CATEGORIES_URL);
  if (categoriesData.status === "ok") {
    console.log("Categorías:", categoriesData.data);
  }
  const categoriesId = 1; // Cambiar según el producto que quieras obtener
  const catsData = await getJSONData(`${CATS_ID_URL}${categoriesId}`);
  if (catsData.status === "ok") {
    console.log("Información del producto:", catsData.data);
  }

  // Obtener información de un producto específico (usa un ID válido)
  const productId = 1; // Cambiar según el producto que quieras obtener
  const productData = await getJSONData(`${PRODUCT_ID_URL}${productId}`);
  if (productData.status === "ok") {
    console.log("Información del producto:", productData.data);
  }

  const productsData = await getJSONData(PRODUCT_INFO_URL);
  if (productsData.status === "ok") {
    console.log("Categorías:", productsData.data);
  }

  // Agrega más solicitudes según sea necesario para probar otras rutas del servidor
})();
