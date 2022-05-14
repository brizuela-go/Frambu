import { createOrder } from "./firebase.js";

document.getElementById("stacking-trigger").addEventListener("click", () => {
  const nombre = document.getElementById("typeText");
  const apellido = document.getElementById("form3Example2");
  const cantidad = document.getElementById("form3Example3");
  const orderForm = document.getElementById("orderForm");

  const correo = orderForm.querySelector("#form16");

  const nombreCompleto = nombre.value + " " + apellido.value;

  if (!(nombreCompleto == "" || cantidad.value == "" || correo.value == "")) {
    console.log(nombreCompleto, parseInt(cantidad.value));

    createOrder(nombreCompleto, parseInt(cantidad.value), correo.value);
    const toast = document.createElement("div");
    toast.setAttribute("class", "toast fade mx-auto");
    toast.setAttribute("role", "alert");
    toast.setAttribute("aria-live", "assertive");
    toast.setAttribute("aria-atomic", "true");
    toast.setAttribute("data-mdb-autohide", "true");
    toast.setAttribute("data-mdb-delay", "2000");
    toast.setAttribute("data-mdb-position", "top-right");
    toast.setAttribute("data-mdb-append-to-body", "true");
    toast.setAttribute("data-mdb-stacking", "true");
    toast.setAttribute("data-mdb-color", "success");
    toast.setAttribute("data-mdb-width", "350px");

    toast.innerHTML = `
    <div class="toast-header text-white">
    <i class="fas fa-check fa me-2"></i>
    <strong class="me-auto">Orden Realizada</strong>
    <small">Justo ahora</small>
    <button type="button" class="btn-close btn-close-white" data-mdb-dismiss="toast" aria-label="Close"></button>
  </div>
  <div class="toast-body text-white">
    Su orden ha sido realizada con éxito
  </div>
    `;

    toast.classList.add("toast", "fade");

    document.body.appendChild(toast);

    const toastInstance = new mdb.Toast(toast, {
      stacking: true,
      hidden: true,
      width: "450px",
      position: "top-right",
      autohide: true,
      delay: 5000,
    });

    toastInstance.show();
    orderForm.reset();
  }
});
