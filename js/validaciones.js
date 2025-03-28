$(document).ready(function () {
    $("#registroForm").submit(function (event) {
      event.preventDefault(); // Evita el envío por defecto
  
      let valido = true;
  
      // Obtener valores de los campos
      let nombre = $("#nombre").val().trim();
      let usuario = $("#usuario").val().trim();
      let correo = $("#correo").val().trim();
      let fechaNacimiento = $("#fechaNacimiento").val();
      let clave = $("#clave").val();
      let repetirClave = $("#repetirClave").val();
  
      // Expresión regular para validar el correo
      let correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  
      // Validar los campos
      function validarCampo(id, condicion) {
        if (condicion) {
          $(id).removeClass("is-invalid").addClass("is-valid");
        } else {
          $(id).addClass("is-invalid");
          valido = false;
        }
      }
  
      validarCampo("#nombre", nombre !== "");
      validarCampo("#usuario", usuario !== "");
      validarCampo("#correo", correoRegex.test(correo));
      validarCampo("#fechaNacimiento", fechaNacimiento !== "");
      validarCampo("#clave", validarContrasenaSegura(clave)); // ✅ validación con reglas de seguridad
      validarCampo("#repetirClave", clave === repetirClave);
  
      // Si es válido, usar función reutilizable
      if (valido) {
        mostrarMensajeExito("¡Registro exitoso! Bienvenido a Ruko Game.");
  
        // Simular guardado del usuario (opcional)
        localStorage.setItem("usuario", JSON.stringify({
          nombre,
          usuario,
          correo,
          fechaNacimiento,
          rol: usuario.toLowerCase() === "admin" ? "admin" : "cliente"
        }));
  
        // Limpiar el formulario después de mostrar el mensaje
        $("#registroForm")[0].reset();
        $(".is-valid").removeClass("is-valid");
  
        // Redirigir automáticamente después de 3 segundos
        setTimeout(function () {
          window.location.replace("index.html");
        }, 3000);
      }
    });
  });