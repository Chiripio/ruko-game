
document.addEventListener("DOMContentLoaded", () => {
    const productos = JSON.parse(localStorage.getItem("productos")) || [];
    const contenedor = document.getElementById("contenedorProductos");
  
    if (!contenedor) return;
  
    // ✅ Detectar la categoría desde data-categoria en <main>
    const categoriaActual = document.querySelector("main").dataset.categoria;
  
    // ✅ Filtrar productos por la categoría actual
    const filtrados = productos.filter(p => p.categoria === categoriaActual);
  
    if (filtrados.length === 0) {
      contenedor.innerHTML = `<p class="text-muted text-center">No hay productos disponibles para esta categoría.</p>`;
      return;
    }
  
    // ✅ Mostrar los productos filtrados
    filtrados.forEach(p => {
      const div = document.createElement("div");
      div.className = "juego d-flex align-items-center justify-content-between p-3 border border-warning rounded mb-3";
  
      div.innerHTML = `
        <img src="../img/${p.imagen}" alt="${p.nombre}" />
        <div class="info text-start flex-grow-1 ms-3">
          <h2>${p.nombre}</h2>
          <p>${p.descripcion || "Producto agregado por administrador."}</p>
          <p class="precio"><strong>Precio:</strong> $${parseInt(p.precio).toLocaleString("es-CL")} CLP</p>
          <p class="text-info"><strong>Stock disponible:</strong> ${p.stock}</p>
          <button class="btn btn-warning agregar-carrito" data-nombre="${p.nombre}" data-precio="${p.precio}" data-stock="${p.stock}">
            Agregar al carrito
          </button>
        </div>
      `;
  
      contenedor.appendChild(div);
    });
  
    // ✅ Activar botones para agregar al carrito con validación de stock
    document.querySelectorAll(".agregar-carrito").forEach(boton => {
      boton.addEventListener("click", () => {
        const nombre = boton.dataset.nombre;
        const precio = parseInt(boton.dataset.precio);
        const stockDisponible = parseInt(boton.dataset.stock);
  
        // Verificar cuántas veces ya está en el carrito
        const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
        const cantidadEnCarrito = carrito.filter(p => p.nombre === nombre).length;
  
        if (cantidadEnCarrito >= stockDisponible) {
          mostrarMensajeExito("❌ No puedes agregar más unidades de este producto. Stock agotado.");
          return;
        }
  
        agregarAlCarrito(nombre, precio);
      });
    });
  });
