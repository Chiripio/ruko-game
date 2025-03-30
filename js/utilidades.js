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

  const producto = productos.find(p => p.nombre === nombre);
  if (!producto) {
    mostrarMensajeExito("⚠️ Producto no encontrado en inventario");
    return;
  }

  const cantidadEnCarrito = carrito.filter(p => p.nombre === nombre).length;

  if (cantidadEnCarrito >= parseInt(producto.stock)) {
    mostrarMensajeExito("❌ No puedes agregar más unidades. Stock agotado.");
    return;
  }

  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarMensajeExito("🛒 Producto agregado al carrito");

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

// ✅ Mostrar acceso a perfil si hay usuario logueado
function mostrarAccesoPerfilSiUsuarioLogueado() {
  const usuario = JSON.parse(localStorage.getItem("usuario"));
  const contenedor = document.getElementById("infoUsuario");

  if (usuario && contenedor) {
    contenedor.innerHTML = `
      👋 Hola, <strong>${usuario.nombre}</strong> (${usuario.rol})
      <a href="perfil.html" class="btn btn-sm btn-outline-warning ms-2">👤 Mi Perfil</a>
    `;

    const btnLogin = document.getElementById("btnLogin");
    const btnRegistro = document.getElementById("btnRegistro");
    if (btnLogin) btnLogin.style.display = "none";
    if (btnRegistro) btnRegistro.style.display = "none";
  }
}

// ✅ Precargar productos si no existen aún
if (!localStorage.getItem("productos")) {
  restablecerProductos(false); // carga inicial silenciosa
}

// ✅ Función para restablecer productos manualmente
function restablecerProductos(confirmar = true) {
  if (!confirmar || window.confirm("¿Estás seguro de que deseas restaurar los productos? Se borrarán los actuales.")) {
    const productosIniciales = [
      // ACCIÓN
      {
        nombre: "God of War",
        descripcion: "Juego de acción mitológica épica",
        precio: 25000,
        stock: 15,
        categoria: "accion",
        imagen: "accion1.jpg"
      },
      {
        nombre: "Devil May Cry 5",
        descripcion: "Combate hack and slash estilizado",
        precio: 23000,
        stock: 15,
        categoria: "accion",
        imagen: "accion2.jpg"
      },

      // ESTRATEGIA
      {
        nombre: "Age of Empires IV",
        descripcion: "Estrategia histórica en tiempo real",
        precio: 22000,
        stock: 15,
        categoria: "estrategia",
        imagen: "estrategia1.jpg"
      },
      {
        nombre: "Starcraft II",
        descripcion: "Estrategia futurista con batallas galácticas",
        precio: 21000,
        stock: 15,
        categoria: "estrategia",
        imagen: "estrategia2.jpg"
      },

      // AVENTURA
      {
        nombre: "Hollow Knight",
        descripcion: "Metroidvania de exploración profunda",
        precio: 18000,
        stock: 15,
        categoria: "aventura",
        imagen: "aventura1.jpg"
      },
      {
        nombre: "Uncharted 4",
        descripcion: "Aventura cinematográfica con acción y puzzles",
        precio: 26000,
        stock: 15,
        categoria: "aventura",
        imagen: "aventura2.jpg"
      },

      // INDIE
      {
        nombre: "Stardew Valley",
        descripcion: "Simulador de vida rural y agricultura",
        precio: 12000,
        stock: 15,
        categoria: "indie",
        imagen: "indi1.jpg"
      },
      {
        nombre: "Celeste",
        descripcion: "Plataformas desafiante con historia emocional",
        precio: 14000,
        stock: 15,
        categoria: "indie",
        imagen: "indi2.jpg"
      },

      // RPG
      {
        nombre: "Final Fantasy XV",
        descripcion: "RPG de mundo abierto con combates épicos",
        precio: 27000,
        stock: 15,
        categoria: "rpg",
        imagen: "rpg1.jpg"
      },
      {
        nombre: "The Witcher 3",
        descripcion: "RPG de fantasía con narrativa profunda",
        precio: 29000,
        stock: 15,
        categoria: "rpg",
        imagen: "rpg2.jpg"
      }
    ];

    localStorage.setItem("productos", JSON.stringify(productosIniciales));
    localStorage.removeItem("carrito"); // opcional: también limpia el carrito

    if (confirmar) {
      mostrarMensajeExito("✅ Productos restaurados correctamente");
      setTimeout(() => location.reload(), 1500);
    }
  }
}