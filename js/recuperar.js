$(document).ready(function () {
    $("#recuperarForm").submit(function (event) {
      event.preventDefault(); // Evita el envío por defecto
  
      let correo = $("#correo").val().trim();
      const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      let valido = true;
  
      // Validar correo
      if (!correoRegex.test(correo)) {
        $("#correo").addClass("is-invalid").removeClass("is-valid");
        valido = false;
      } else {
        $("#correo").removeClass("is-invalid").addClass("is-valid");
      }
  
      if (valido) {
        // ✅ Mostrar mensaje de éxito reutilizable
        mostrarMensajeExito("📧 Instrucciones para recuperar la contraseña han sido enviadas.");
  
        // ✅ Redirigir después de 3 segundos
        setTimeout(function () {
          $("#recuperarForm")[0].reset();
          $(".is-valid").removeClass("is-valid");
          window.location.href = "login.html";
        }, 3000);
      }
    });
  });