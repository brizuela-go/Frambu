// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.7.0/firebase-app.js";
import {
  getFirestore,
  collection,
  getDoc,
  getDocs,
  doc,
  addDoc,
  deleteDoc,
  updateDoc,
  query,
  where,
  onSnapshot,
  Timestamp,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-firestore.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/9.7.0/firebase-auth.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBduob0U9SkmtNqjNcraGXLHEKvcUbPwI0",
  authDomain: "mermelada-dashboard.firebaseapp.com",
  databaseURL: "https://mermelada-dashboard-default-rtdb.firebaseio.com",
  projectId: "mermelada-dashboard",
  storageBucket: "mermelada-dashboard.appspot.com",
  messagingSenderId: "116392436379",
  appId: "1:116392436379:web:0783f6f9f27a9a63389c3e",
  measurementId: "G-Y7SVC3XGCM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export const isUserHere = (dashboard, login, avatar, displayName) =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      dashboard.style.display = "block";
      login.style.display = "none";
      if (user.displayName == null) {
        avatar.setAttribute(
          "src",
          "https://storage.googleapis.com/media.clinicavisualyauditiva.com/images/2019/11/211fd983-default-user-image.png"
        );
        displayName.innerText = `¡Bienvenid@, ${user.email}!`;
      } else {
        displayName.innerText = `¡Bienvenid@, ${user.displayName}!`;
        avatar.setAttribute("src", user.photoURL);
      }
    } else {
      login.style.display = "block";
      dashboard.style.display = "none";
    }
  });

export const isUserHereAdmin = (administrador, login, displayName, avatar) =>
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      // ...
      administrador.style.display = "block";
      login.style.display = "none";
      if (user.displayName == null) {
        avatar.setAttribute(
          "src",
          "https://storage.googleapis.com/media.clinicavisualyauditiva.com/images/2019/11/211fd983-default-user-image.png"
        );
        displayName.innerText = `Administra tus órdenes, ${user.email}`;
      } else {
        displayName.innerText = `Administra tus órdenes, ${user.displayName}`;
        avatar.setAttribute("src", user.photoURL);
      }
    } else {
      login.style.display = "block";
      administrador.style.display = "none";
    }
  });

export const logOut = () =>
  signOut(auth)
    .then(() => {
      console.log("User Signed Out");
    })
    .catch((err) => {
      console.log(err);
    });

export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      console.log(errorCode, errorMessage, email, credential);

      // ...
    });
};

// Create New Account Using Email/Password
export const signUpWithEmailAndPassword = async (
  txtEmail,
  txtPassword,
  alertDiv
) => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      console.log(user);
      alertDiv.innerHTML = "";

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, +" => " + errorMessage);
      alertDiv.setAttribute("class", "alert alert-danger my-3");
      alertDiv.setAttribute("role", "alert");
      alertDiv.innerHTML = `<div>
      <i class="fas fa-times-circle me-3"></i>${errorMessage}
    </div>`;

      // ..
    });
};

// Sign in with Existing Users
export const logInWithEmailAndPassword = async (
  txtEmail,
  txtPassword,
  alertDiv
) => {
  const email = txtEmail.value;
  const password = txtPassword.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      alertDiv.innerHTML = "";
      console.log(email, password);

      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode, +" => " + errorMessage);
      alertDiv.setAttribute("class", "alert alert-danger my-3");
      alertDiv.setAttribute("role", "alert");
      alertDiv.innerHTML = `<div>
      <i class="fas fa-times-circle me-3"></i>${errorMessage}
    </div>`;
    });
};

const collectionRef = collection(
  db,
  "users",
  "j8BGU1yuXwXhtTdUWDH5RUuNEx12",
  "orders"
);

export const array = [];
export const ganancias = [];
export const clientes = [];
export const frambus = [];
export const dias = {};

// Create our number formatter.
export const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const pendingCollectionRef = query(collectionRef, where("status", "==", false));

export const onGetorders = (callback) =>
  onSnapshot(pendingCollectionRef, callback);

export const querySnapshot = await getDocs(collectionRef);

export const getorder = (id) =>
  getDoc(doc(db, "users", "j8BGU1yuXwXhtTdUWDH5RUuNEx12", "orders", id));

querySnapshot.forEach((doc) => {
  const order = doc.data();
  clientes.push(order.email);
  array.push([
    doc.id,
    order.email,
    order.cliente,
    order.fecha,
    order.modificado,
    order.finalizado,
    order.status == true ? "Pagado" : "Pendiente",
    order.cantidad,
    formatter.format(order.precio),
  ]);
});

const q = query(collectionRef, where("status", "==", true));

export const querySnapshotPie = await getDocs(q);

querySnapshotPie.forEach((doc) => {
  frambus.push(doc.data().cantidad);
  ganancias.push(doc.data().precio);
  dias[doc.data().fecha] = doc.data().cantidad;
});

// Create
export const createOrder = (clientName, quant, email) => {
  addDoc(collection(db, "users", "j8BGU1yuXwXhtTdUWDH5RUuNEx12", "orders"), {
    cliente: clientName,
    fecha: Timestamp.now().toDate().toString(),
    cantidad: quant,
    status: false,
    precio: quant * 15,
    email: email,
  });
};

// Delete
export const deleteOrder = (id) => {
  deleteDoc(doc(db, "users", "j8BGU1yuXwXhtTdUWDH5RUuNEx12", "orders", id));
};

// Update
export const updateOrder = (id, clientName, quant) => {
  updateDoc(doc(db, "users", "j8BGU1yuXwXhtTdUWDH5RUuNEx12", "orders", id), {
    cliente: clientName,
    modificado: Timestamp.now().toDate().toString(),
    cantidad: quant,
    precio: quant * 15,
  });
};

// Check Order
export const checkOrder = (id) => {
  updateDoc(doc(db, "users", "j8BGU1yuXwXhtTdUWDH5RUuNEx12", "orders", id), {
    status: true,
    finalizado: Timestamp.now().toDate().toString(),
  });
};
