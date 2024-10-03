function mostrarComentarios(comments) {
    const commentsContainer = document.getElementById("product-comments");
    let commentsHTML = "<h3 id=opiniones>  Opiniones del producto  </h3>";
  
    comments.forEach(comment => {
      commentsHTML += `
        <div class="comment">
          <div class="rating">
            ${'⭐'.repeat(comment.score)}
          </div>
          <div class="d-flex justify-content-between">
            <strong>${comment.user}</strong>
            <span>${comment.dateTime}</span>
          </div>
          <p>${comment.description}</p>
          <br>
          <hr>
        </div>
      `;
    });
  
    commentsContainer.innerHTML = commentsHTML;
  }
  document.addEventListener("DOMContentLoaded", function() {
    // Obtener información del producto
    getJSONData(productInfoURL).then(function(resultObj) {
      if (resultObj.status === "ok") {
        mostrarInformacionProducto(resultObj.data);
      }
    });
  
    // Obtener comentarios del producto
    getJSONData(productCommentsURL).then(function(resultObj) {
      if (resultObj.status === "ok") {
        mostrarComentarios(resultObj.data);
      }
    });
  });
  