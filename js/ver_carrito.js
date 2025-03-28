
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("carrito-lista");
  const totalElement = document.getElementById("total-carrito");
  let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

  function actualizarCarrito() {
    if (!tbody || !totalElement) return;

    tbody.innerHTML = "";
    let total = 0;

    if (carrito.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="5" class="text-center text-muted">🛒 Tu carrito está vacío.</td>
        </tr>`;
      totalElement.textContent = "$0";
      actualizarContador();
      return;
    }

    // Agrupar productos por nombre
    const productosAgrupados = {};
    carrito.forEach((item) => {
      if (!productosAgrupados[item.nombre]) {
        productosAgrupados[item.nombre] = {
          nombre: item.nombre,
          precio: parseInt(item.precio),
          cantidad: 1
        };
      } else {
        productosAgrupados[item.nombre].cantidad++;
      }
    });

    // Mostrar productos agrupados
    Object.values(productosAgrupados).forEach((p) => {
      const subtotal = p.precio * p.cantidad;
      total += subtotal;

      const fila = document.createElement("tr");
      fila.innerHTML = `
        <td>${p.nombre}</td>
        <td>$${p.precio.toLocaleString("es-CL")}</td>
        <td>${p.cantidad}</td>
        <td>$${subtotal.toLocaleString("es-CL")}</td>
        <td><button class="btn btn-sm btn-danger eliminar" data-nombre="${p.nombre}">Eliminar</button></td>
      `;
      tbody.appendChild(fila);
    });

    totalElement.textContent = `$${total.toLocaleString("es-CL")}`;
    actualizarContador();
  }

  function actualizarContador() {
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
      contador.textContent = carrito.length;
    }
  }

  // Evento eliminar individual
  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("eliminar")) {
      const nombre = e.target.dataset.nombre;
      carrito = carrito.filter(p => p.nombre !== nombre);
      localStorage.setItem("carrito", JSON.stringify(carrito));
      actualizarCarrito();
    }
  });

  // Evento vaciar carrito
  document.getElementById("vaciarCarrito").addEventListener("click", () => {
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
    mostrarMensajeExito("🧹 Carrito vaciado");
  });

  // Evento finalizar compra
  document.getElementById("finalizarCompra").addEventListener("click", () => {
    if (carrito.length === 0) {
      mostrarMensajeExito("⚠️ Tu carrito está vacío");
      return;
    }
    mostrarMensajeExito("✅ Compra realizada exitosamente. Gracias por preferir Ruko Game.");
    carrito = [];
    localStorage.removeItem("carrito");
    actualizarCarrito();
  });

  actualizarCarrito();
});
