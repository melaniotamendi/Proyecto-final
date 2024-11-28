const express = require('express');
const cors = require('cors')
const path = require('path');
const fs = require('fs');


const app = express();

app.use(cors())

const PORT = 3800;

// Ruta para devolver todos los productos de `cats_products`
app.get('/cats', (req, res) => {
  const filePath = path.join(__dirname, 'emercado-api-main/cats/cat.json');
  res.sendFile(filePath)

});
app.get('/cats_products/:id', (req, res) => {
  const { id } = req.params; // Extraemos el id de la URL
  const catsFilePath = path.join(__dirname, `emercado-api-main/cats_products/${id}.json`);

  // Verificar si el archivo existe
  fs.access(catsFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      return res.status(404).json({ error: 'Categoría no encontrada' }); // Si el archivo no existe, devolver un error 404
    }

    // Si el archivo existe, enviarlo como respuesta
    res.sendFile(catsFilePath);
  });
});



app.get('/products', (req, res) => {
  const productsDirPath = path.join(__dirname, 'emercado-api-main/products');

  // Leer los archivos dentro de la carpeta 'products'
  fs.readdir(productsDirPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error al leer la carpeta de productos' });
    }

    // Filtrar solo los archivos .json
    const productFiles = files.filter(file => file.endsWith('.json'));

    // Crear un array con el contenido de cada archivo
    const products = [];
    productFiles.forEach(file => {
      const filePath = path.join(productsDirPath, file);
      const productData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
      products.push(productData);
    });

    // Devolver todos los productos como una respuesta JSON
    res.json(products);
  });
});

app.get('/products/:id', (req, res) => {
  const { id } = req.params;
  const productsIdFilePath = path.join(__dirname, `emercado-api-main/products/${id}.json`);
  res.sendFile(productsIdFilePath)

});



// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
