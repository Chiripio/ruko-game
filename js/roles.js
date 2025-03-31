document.addEventListener("DOMContentLoaded", () => {
    const usuario = localStorage.getItem("usuario");
    const rol = localStorage.getItem("rol");
  
    // Mostrar usuario en consola
    console.log("Usuario:", usuario, "| Rol:", rol);
  
    // Mostrar en la interfaz si hay un lugar asignado (ejemplo)
    const spanUsuario = document.getElementById("usuarioActivo");
    if (spanUsuario && usuario) {
      spanUsuario.textContent = `${usuario} (${rol})`;
    }
  
    // Si eres admin, puedes mostrar botones especiales
    if (rol === "admin") {
      const panelAdmin = document.getElementById("panelAdmin");
      if (panelAdmin) {
        panelAdmin.classList.remove("d-none");
      }
    }
  });
