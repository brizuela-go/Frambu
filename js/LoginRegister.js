import {
  signUpWithEmailAndPassword,
  logInWithEmailAndPassword,
  signInWithGoogle,
  logOut,
} from "./firebase.js";

// Register
const btnSignUp = document.getElementById("btn-sign-up");

btnSignUp.addEventListener("click", () => {
  const txtEmail = document.getElementById("registerEmail");
  const txtPassword = document.getElementById("registerPassword");
  const txtRepeatPassword = document.getElementById("registerRepeatPassword");
  const alertDiv = document.getElementById("myAlert");

  if (txtPassword.value != txtRepeatPassword.value) {
    alert("Contraseñas No Coinciden");
  } else {
    signUpWithEmailAndPassword(txtEmail, txtPassword, alertDiv);
  }
});

// Sign In
const btnSignIn = document.getElementById("btn-sign-in");

btnSignIn.addEventListener("click", () => {
  const txtEmail = document.getElementById("loginName");
  const txtPassword = document.getElementById("loginPassword");
  const alertDiv = document.getElementById("myAlertSignIn");

  logInWithEmailAndPassword(txtEmail, txtPassword, alertDiv);
});

// Sign in With Google

const googleBtnSignIn = document.getElementById("google");

googleBtnSignIn.addEventListener("click", () => {
  signInWithGoogle();
});

const googleBtnSignInAdmin = document.getElementById("googleAdmin");

googleBtnSignInAdmin.addEventListener("click", () => {
  signInWithGoogle();
});

// Logout

const logout = document.getElementById("logout");

logout.addEventListener("click", () => {
  logOut();
});
