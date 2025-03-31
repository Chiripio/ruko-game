$(document).ready(function () {
  $("#perfilForm").submit(function (event) {
    event.preventDefault();

    let valido = true;
    const correoRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const campos = ["nombre", "usuario", "correo", "fechaNacimiento"];

    // Limpiar clases previas
    $(".form-control").removeClass("is-valid is-invalid");

    campos.forEach((campo) => {
      const valor = $("#" + campo).val().trim();

      if (campo === "correo" && !correoRegex.test(valor)) {
        $("#" + campo).addClass("is-invalid");
        valido = false;
      } else if (valor === "") {
        $("#" + campo).addClass("is-invalid");
        valido = false;
      } else {
        $("#" + campo).addClass("is-valid");
      }
    });

    if (valido) {
      mostrarMensajeExito("✅ Cambios guardados.");

      setTimeout(() => {
        $("#perfilForm")[0].reset(); // Limpiar campos
        $(".form-control").removeClass("is-valid");
      }, 3000);
    }
  });
});
