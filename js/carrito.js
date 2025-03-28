// Función para agregar un juego al carrito
function agregarAlCarrito(nombre, precio) {
  const juego = { nombre, precio };

  // Obtener carrito actual desde localStorage
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  // Agregar el juego
  carrito.push(juego);

  // Guardar carrito actualizado
  localStorage.setItem("carrito", JSON.stringify(carrito));

  // Mostrar mensaje
  mostrarMensajeExito(`🎮 ${nombre} agregado al carrito`);

  // Actualizar el contador visual
  actualizarContador();
}

// Función para actualizar el contador del carrito en el ícono
function actualizarContador() {
  const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
  const contador = document.getElementById("contadorCarrito");
  if (contador) {
    contador.textContent = carrito.length;
  }
}

// Esperar que cargue el DOM
document.addEventListener("DOMContentLoaded", () => {
  // Asociar evento a todos los botones que agregan al carrito
  const botones = document.querySelectorAll(".agregar-carrito");
  botones.forEach((boton) => {
    boton.addEventListener("click", () => {
      const nombre = boton.dataset.nombre;
      const precio = parseInt(boton.dataset.precio);
      agregarAlCarrito(nombre, precio);
    });
  });

  // Mostrar el contador actualizado al cargar la página
  actualizarContador();
});