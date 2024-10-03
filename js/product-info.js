
document.addEventListener("DOMContentLoaded", function () {
    const stars = document.querySelectorAll(".rating .fa");
    
    stars.forEach(star => {
      star.addEventListener("click", function() {
        // Remueve clase 'active' de todas las estrellas
        stars.forEach(s => s.classList.remove("active"));
        // Añade clase 'active' a las estrellas seleccionadas y anteriores
        this.classList.add("active");
        let prevSibling = this.previousElementSibling;
        while (prevSibling) {
          prevSibling.classList.add("active");
          prevSibling = prevSibling.previousElementSibling;
        }
      });
    });
  });
  