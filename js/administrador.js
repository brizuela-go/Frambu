import {
  onGetorders,
  deleteOrder,
  checkOrder,
  updateOrder,
  getorder,
  clientes,
  isUserHereAdmin,
} from "./firebase.js";

const ordersContainer = document.getElementById("ordersContainer");
const audio = new Audio();
audio.src = "assets/sounds/Click.mp3";

// Create our number formatter.
var formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

onGetorders((querySnapshot) => {
  if (querySnapshot.size == 0) {
    confetti("tsparticles", {
      angle: 90,
      count: 25,
      position: { x: 50, y: 50 },
      spread: 90,
      startVelocity: 60,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      colors: ["#fff", "#f0f"],
      shapes: ["square", "circle"],
      scalar: 1,
      zIndex: 2000,
      disableForReducedMotion: true,
    });
    ordersContainer.innerHTML = `<h5 class="text-center">No hay órdenes pendientes 💪</h5>`;
  } else ordersContainer.innerHTML = "";

  querySnapshot.forEach((doc) => {
    const order = doc.data();
    audio.play();

    ordersContainer.innerHTML += `
    <li
                    class="list-group-item border-0 d-flex p-4 mb-2 mt-3 bill border-radius-lg"
                  >
                    <div class="d-flex flex-column">
                      <h5 class="mb-4 ">${order.cliente}</h5>
                      <span class="mb-2 text-xs"
                      >Correo:
                      <span class="text-dark font-weight-bold ms-sm-2"
                        >${order.email}</span
                      ></span
                    >
                      <span class="mb-2 text-xs"
                        >Cantidad:
                        <span class="text-dark font-weight-bold ms-sm-2"
                          >${order.cantidad}</span
                        ></span
                      >
                      <span class="mb-2 text-xs"
                      >Precio:
                      <span class="text-dark font-weight-bold ms-sm-2"
                        >${formatter.format(order.precio)}</span
                      ></span
                    >
                      <span class="mb-2 text-xs"
                        >Fecha:
                        <span class="text-dark ms-sm-2 font-weight-bold"
                          >${order.fecha}
                          </span
                        ></span
                      >
                      <span class="text-xs"
                        >Estado:
                        <span class="text-dark ms-sm-2 font-weight-bold"
                          >${
                            order.status == true ? "Completado" : "Pendiente"
                          }</span
                        ></span
                      >
                    </div>
                    <div class="ms-auto text-end">
                      <button
                        class="btn btn-link text-danger text-gradient px-3 mb-0 btn-delete"
                        data-id="${doc.id}"
                        ><i class="far fa-trash-alt me-2"></i>Eliminar
                      </button>
                      <button
                        class="btn btn-link text-dark px-3 mb-0 btn-edit"
                        data-id="${doc.id}"
                        data-mdb-toggle="modal"
                        data-mdb-target="#exampleModal"
                        ><i
                          class="fas fa-pencil-alt text-dark me-2"
                          aria-hidden="true"
                        ></i
                        >Editar
                      </button>
                      <button
                        class="btn btn-link text-success text-gradient px-3 mb-0 check"
                        data-id="${doc.id}"
                        ><i class="fas fa-clipboard-check"></i> Finalizar
                      </button>
                    </div>
                  </li>`;
  });

  const btnsDelete = ordersContainer.querySelectorAll(".btn-delete");
  btnsDelete.forEach((btn) =>
    btn.addEventListener("click", async ({ target: { dataset } }) => {
      try {
        deleteOrder(dataset.id);
      } catch (error) {
        console.log(error);
      }
    })
  );

  const btnsEdit = ordersContainer.querySelectorAll(".btn-edit");
  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async (e) => {
      try {
        const doc = await getorder(e.target.dataset.id);
        const cantidad = document.getElementById("typeNumber");
        const clienteName = document.getElementById("typeName");

        cantidad.value = doc.data().cantidad;
        clienteName.value = doc.data().cliente;

        const updateButton = document.getElementById("updateButton");
        updateButton.addEventListener("click", () => {
          updateOrder(doc.id, clienteName.value, parseInt(cantidad.value));
        });
      } catch (error) {
        console.log(error);
      }
    });
  });

  const btnCheck = ordersContainer.querySelectorAll(".check");
  btnCheck.forEach((btn) =>
    btn.addEventListener("click", async ({ target: { dataset } }) => {
      try {
        confetti("tsparticles", {
          angle: 90,
          count: 25,
          position: { x: 50, y: 50 },
          spread: 90,
          startVelocity: 60,
          decay: 0.9,
          gravity: 1,
          drift: 0,
          ticks: 200,
          colors: ["#fff", "#f0f"],
          shapes: ["square", "circle"],
          scalar: 1,
          zIndex: 2000,
          disableForReducedMotion: true,
        });
        checkOrder(dataset.id, {
          completado: true,
        });
      } catch (error) {
        console.log(error);
      }
    })
  );
});

const customContent = document.querySelector("#customContent");

let uniqueClients = [...new Set(clientes)];

const data = uniqueClients;

const dataFilter = (value) => {
  return data.filter((item) => {
    return item.toLowerCase().startsWith(value.toLowerCase());
  });
};

new mdb.Autocomplete(customContent, {
  filter: dataFilter,
});

const administrador = document.getElementById("administrador");
const login = document.getElementById("loginAdmin");
const displayNameAdmin = document.getElementById("displayNameAdmin");
const avatarAdmin = document.getElementById("avatarAdmin");

isUserHereAdmin(administrador, login, displayNameAdmin, avatarAdmin);

const logoutAdmin = document.getElementById("logoutAdmin");

logoutAdmin.addEventListener("click", () => {
  logOut();
});
