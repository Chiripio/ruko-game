$(document).ready(function () {
    $("#loginForm").submit(function (event) {
      event.preventDefault();
  
      let usuario = $("#usuario").val().trim();
      let clave = $("#clave").val().trim();
      let valido = true;
  
      function validarCampo(id, valor) {
        if (valor === "") {
          $(id).addClass("is-invalid");
          valido = false;
        } else {
          $(id).removeClass("is-invalid").addClass("is-valid");
        }
      }
  
      validarCampo("#usuario", usuario);
      validarCampo("#clave", clave);
  
      if (valido) {
        // ✅ Simulación: si es "admin", se guarda como tal
        let rol = usuario.toLowerCase() === "admin" ? "admin" : "cliente";
  
        // ✅ Guardar usuario como objeto en localStorage
        const datosUsuario = {
          nombre: usuario,
          rol: rol
        };
        localStorage.setItem("usuario", JSON.stringify(datosUsuario));
  
        mostrarMensajeExito("✅ Inicio de sesión exitoso. Bienvenido a Ruko Game.");
  
        setTimeout(() => {
          window.location.replace("index.html");
        }, 2000);
      }
    });
  });