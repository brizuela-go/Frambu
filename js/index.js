import {
  array,
  querySnapshot,
  querySnapshotPie,
  ganancias,
  clientes,
  formatter,
  frambus,
  isUserHere,
  dias,
} from "./firebase.js";

const sidenav = document.getElementById("sidenav-1");
const instance = mdb.Sidenav.getInstance(sidenav);

let innerWidth = null;

const setMode = (e) => {
  // Check necessary for Android devices
  if (window.innerWidth === innerWidth) {
    return;
  }

  innerWidth = window.innerWidth;

  if (window.innerWidth < 1400) {
    instance.changeMode("over");
    instance.hide();
  } else {
    instance.changeMode("side");
    instance.show();
  }
};

setMode();

// Event listeners
window.addEventListener("resize", setMode);

const basicData = {
  columns: [
    "ID de la Orden",
    "Correo",
    "Cliente",
    "Iniciado",
    "Modificado",
    "Finalizado",
    "Estado",
    "Cantidad",
    "$",
  ],
  rows: array,
};

const options = {
  striped: true,
  loaderClass: "bg-info",
  borderColor: "light",
  bordered: true,
  multi: true,
};

const searchInstance = new mdb.Datatable(
  document.getElementById("datatable"),
  basicData,
  options
);

document
  .getElementById("datatable-search-input")
  .addEventListener("input", (e) => {
    searchInstance.search(e.target.value);
  });

let values = [];
let diasSumados = {};

Object.entries(dias).forEach(([key, value]) => {
  let date = new Date(key);
  let day = date.toLocaleString("es-ES", { weekday: "long" });
  values.push(value);
  diasSumados[day] = values.reduce((partialSum, a) => partialSum + a, 0);
});

let diasDeLaSemana = [];
let sumatoriaDeDias = [];

Object.entries(diasSumados).forEach(([key, value]) => {
  diasDeLaSemana.push(key);
  sumatoriaDeDias.push(value);
});

// Charts
// Chart
const dataLine = {
  type: "bar",
  data: {
    labels: diasDeLaSemana,
    datasets: [
      {
        label: "Cantidad Vendida hasta ese día",
        data: sumatoriaDeDias,
      },
    ],
  },
};

// Pie Chart
// Data
const dataChartDataLabelsExample = {
  type: "pie",
  data: {
    labels: ["Pagado", "Pendiente"],
    datasets: [
      {
        label: "Órdenes",
        data: [
          querySnapshotPie.size,
          querySnapshot.size - querySnapshotPie.size,
        ],
        backgroundColor: ["rgba(156, 39, 176, 0.5)", "rgba(233, 30, 99, 0.5)"],
      },
    ],
  },
};

// Options
const optionsChartDataLabelsExample = {
  dataLabelsPlugin: true,
  options: {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          // Assign the data to the variable and format it according to your needs
          let dataArr = dataChartDataLabelsExample.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: "white",
        labels: {
          title: {
            font: {
              size: "14",
            },
          },
        },
      },
    },
  },
};

new mdb.Chart(
  document.getElementById("chart-data-mdb-labels-example"),
  dataChartDataLabelsExample,
  optionsChartDataLabelsExample
);

new mdb.Chart(document.getElementById("line-chart"), dataLine);

let uniqueClients = [...new Set(clientes)];

const numeroDeClientes = document.querySelector("#numeroDeCLientes");
const cantidadVendida = document.querySelector("#cantidadVendida");
const frambusMostradas = document.querySelector("#frambusVendidas");

const sumaDeGanancias = ganancias.reduce((partialSum, a) => partialSum + a, 0);
const totatDeFrambus = frambus.reduce((partialSumm, a) => partialSumm + a, 0);

numeroDeClientes.innerText = uniqueClients.length;
cantidadVendida.innerText = formatter.format(sumaDeGanancias);
frambusMostradas.innerText = totatDeFrambus;

const ordenesPendientesCantidad = document.getElementById(
  "ordenesPendientesCantidad"
);

ordenesPendientesCantidad.innerText =
  querySnapshot.size - querySnapshotPie.size;

const dashboard = document.getElementById("dashboard");
const login = document.getElementById("login");
const avatar = document.querySelector(".rounded-circle");
const displayName = document.getElementById("displayName");
const administrador = document.getElementById("administrador");

isUserHere(dashboard, login, avatar, displayName, administrador);
