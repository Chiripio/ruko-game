const productosKey = "productos";

// Obtener productos desde localStorage
function obtenerProductos() {
  return JSON.parse(localStorage.getItem(productosKey)) || [];
}

// Guardar productos en localStorage
function guardarProductos(productos) {
  localStorage.setItem(productosKey, JSON.stringify(productos));
}

// Mostrar productos en la tabla
function listarProductos() {
  const productos = obtenerProductos();
  const tbody = document.getElementById("tablaProductos");
  if (!tbody) return;

  tbody.innerHTML = "";

  productos.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${parseInt(producto.precio).toLocaleString("es-CL")}</td>
      <td>${producto.stock}</td>
      <td>${producto.categoria}</td>
      <td>
        <button class="btn btn-sm btn-outline-warning editar" data-index="${index}">Editar</button>
        <button class="btn btn-sm btn-outline-danger eliminar" data-index="${index}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Agregar o actualizar producto
function agregarOActualizarProducto(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombreProducto").value.trim();
  const precio = document.getElementById("precioProducto").value;
  const stock = document.getElementById("stockProducto").value;
  const descripcion = document.getElementById("descripcionProducto").value.trim();
  const categoria = document.getElementById("categoriaProducto").value;
  const imagen = document.getElementById("imagenProducto").value;
  const index = document.getElementById("indexProducto").value;

  if (!nombre || !precio || !stock || !descripcion || !categoria || !imagen) {
    mostrarMensajeExito("⚠️ Debes completar todos los campos.");
    return;
  }

  const productos = obtenerProductos();
  const producto = { nombre, precio, stock, descripcion, categoria, imagen };

  if (index) {
    productos[index] = producto;
  } else {
    productos.push(producto);
  }

  guardarProductos(productos);
  listarProductos();
  document.getElementById("formProducto").reset();
  document.getElementById("indexProducto").value = "";
  mostrarMensajeExito("✅ Producto guardado correctamente");
}

// Cargar producto en el formulario para editar
function cargarProductoParaEditar(index) {
  const productos = obtenerProductos();
  const producto = productos[index];
  document.getElementById("nombreProducto").value = producto.nombre;
  document.getElementById("precioProducto").value = producto.precio;
  document.getElementById("stockProducto").value = producto.stock;
  document.getElementById("descripcionProducto").value = producto.descripcion;
  document.getElementById("categoriaProducto").value = producto.categoria;
  document.getElementById("imagenProducto").value = producto.imagen;
  document.getElementById("indexProducto").value = index;
}

// Eliminar producto con confirmación
function eliminarProducto(index) {
  const productos = obtenerProductos();
  const confirmacion = confirm("¿Estás seguro de que deseas eliminar este producto?");
  if (confirmacion) {
    productos.splice(index, 1);
    guardarProductos(productos);
    listarProductos();
    mostrarMensajeExito("🗑️ Producto eliminado correctamente");
  }
}

// Delegar eventos de edición y eliminación
function delegarEventos() {
  const tbody = document.getElementById("tablaProductos");
  if (!tbody) return;

  tbody.addEventListener("click", (e) => {
    if (e.target.classList.contains("editar")) {
      const index = e.target.dataset.index;
      cargarProductoParaEditar(index);
    } else if (e.target.classList.contains("eliminar")) {
      const index = e.target.dataset.index;
      eliminarProducto(index); // Solo una vez aquí
    }
  });
}

// Cargar imágenes disponibles en el selector
function cargarOpcionesImagenes() {
  const select = document.getElementById("imagenProducto");
  const imagenes = [
    "accion1.jpg", "accion2.jpg",
    "aventura1.jpg", "aventura2.jpg",
    "estrategia1.jpg", "estrategia2.jpg",
    "rpg1.jpg", "rpg2.jpg",
    "indi1.jpg", "indi2.jpg"
  ];

  imagenes.forEach(img => {
    const option = document.createElement("option");
    option.value = img;
    option.textContent = img;
    select.appendChild(option);
  });
}

// Función para buscar productos por nombre o categoría
function buscarProductos(e) {
  const productos = obtenerProductos();
  const searchTerm = e.target.value.toLowerCase();
  
  const productosFiltrados = productos.filter(p => 
    p.nombre.toLowerCase().includes(searchTerm) || 
    p.categoria.toLowerCase().includes(searchTerm)
  );

  // Actualiza la tabla con los productos filtrados
  const tbody = document.getElementById("tablaProductos");
  tbody.innerHTML = "";

  productosFiltrados.forEach((producto, index) => {
    const fila = document.createElement("tr");
    fila.innerHTML = `
      <td>${producto.nombre}</td>
      <td>$${parseInt(producto.precio).toLocaleString("es-CL")}</td>
      <td>${producto.stock}</td>
      <td>${producto.categoria}</td>
      <td>
        <button class="btn btn-sm btn-outline-warning editar" data-index="${index}">Editar</button>
        <button class="btn btn-sm btn-outline-danger eliminar" data-index="${index}">Eliminar</button>
      </td>
    `;
    tbody.appendChild(fila);
  });
}

// Inicializar todo al cargar
window.addEventListener("DOMContentLoaded", () => {
  listarProductos();
  delegarEventos();
  cargarOpcionesImagenes();

  // Buscador de productos
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", buscarProductos);
  }

  document.getElementById("formProducto").addEventListener("submit", agregarOActualizarProducto);

  // 🔁 Si la tabla sigue vacía después de un tiempo, volver a intentar cargar
  setTimeout(() => {
    if (document.getElementById("tablaProductos").innerHTML.trim() === "") {
      listarProductos();
    }
  }, 100);
});