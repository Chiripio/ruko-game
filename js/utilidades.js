// ✅ Mostrar mensaje de éxito reutilizable
function mostrarMensajeExito(texto) {
    const mensaje = document.createElement("div");
    mensaje.classList.add("mensaje-exito");
    mensaje.textContent = texto;
  
    document.body.appendChild(mensaje);
  
    setTimeout(() => {
      mensaje.remove();
    }, 3000);
  }
  
  // ✅ Agregar al carrito con validación de stock
  function agregarAlCarrito(nombre, precio) {
    let carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    let productos = JSON.parse(localStorage.getItem("productos")) || [];
  
    // Buscar el producto original
    const producto = productos.find(p => p.nombre === nombre);
    if (!producto) {
      mostrarMensajeExito("⚠️ Producto no encontrado en inventario");
      return;
    }
  
    // Verificar cuántas veces está en el carrito
    const cantidadEnCarrito = carrito.filter(p => p.nombre === nombre).length;
  
    if (cantidadEnCarrito >= parseInt(producto.stock)) {
      mostrarMensajeExito("❌ No puedes agregar más unidades. Stock agotado.");
      return;
    }
  
    // Agregar al carrito
    carrito.push({ nombre, precio });
    localStorage.setItem("carrito", JSON.stringify(carrito));
    mostrarMensajeExito("🛒 Producto agregado al carrito");
  
    // Actualizar contador visual
    actualizarContador();
  }
  
  // ✅ Actualizar el contador del ícono del carrito
  function actualizarContador() {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    const contador = document.getElementById("contadorCarrito");
    if (contador) {
      contador.textContent = carrito.length;
    }
  }
  
  // ✅ Mostrar el nombre del usuario si está logueado
  function mostrarUsuarioEnHeader() {
    const usuario = localStorage.getItem("usuario");
    const contenedor = document.getElementById("usuarioActivo");
  
    if (usuario && contenedor) {
      contenedor.innerHTML = `👤 Bienvenido, <strong>${usuario}</strong>`;
    }
  }
  
  // ✅ Mostrar acceso a perfil si hay usuario logueado
  function mostrarAccesoPerfilSiUsuarioLogueado() {
    const usuario = JSON.parse(localStorage.getItem("usuario"));
    const contenedor = document.getElementById("infoUsuario");
  
    if (usuario && contenedor) {
      contenedor.innerHTML = `
        👋 Hola, <strong>${usuario.nombre}</strong> (${usuario.rol})
        <a href="perfil.html" class="btn btn-sm btn-outline-warning ms-2">👤 Mi Perfil</a>
      `;
  
      // Ocultar botones de login y registro si existen
      const btnLogin = document.getElementById("btnLogin");
      const btnRegistro = document.getElementById("btnRegistro");
      if (btnLogin) btnLogin.style.display = "none";
      if (btnRegistro) btnRegistro.style.display = "none";
    }
  }