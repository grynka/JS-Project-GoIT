import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';
import 'firebaseui/dist/firebaseui.css'
import { } from 'firebase/database';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile , onAuthStateChanged } from "firebase/auth";
// Import the functions you need from the SDKs you need

const firebaseConfig = {
  apiKey: "AIzaSyCBVttcy80wPYz_TQ1cewc4jaBreMn9eR8",
  authDomain: "my-project-1521664687668.firebaseapp.com",
  databaseURL: "https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "my-project-1521664687668",
  storageBucket: "my-project-1521664687668.appspot.com",
  messagingSenderId: "1077728122567",
  appId: "1:1077728122567:web:a129b85356da4e98c390e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


document.getElementById('auth-form').addEventListener('submit', auth)

function auth(event) {
    event.preventDefault();
    const email = event.target.querySelector('#email').value
    const password = event.target.querySelector('#password').value
    if (event.submitter.id === 'sign') {
        authFormSend(email, password)
        event.submitter.disabled = true;
    }
    else if (event.submitter.id === 'register') {
        authFormReg(email, password)
        event.submitter.disabled = true;

    }
    else if (event.submitter.id === 'status') {
        authStatus()
    }
    else if (event.submitter.id === 'favorite') {
        addFavorite(event.submitter.id)
    }

}


function addFavorite(id) {
const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
}).then(() => {
  // Profile updated!
  console.log(uid)
}).catch((error) => {
  // An error occurred
  // ...
});
}


function authStatus() {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      console.log(uid)
    } else {
        console.log("вхід не виконано")
        // ...
    }
  });
}

function authFormSend(email, password) {

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log("Вхід успішний " + userCredential.user.email)
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

}

function authFormReg(email, password) {
    const auth = getAuth();
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log("Користувача успішно створено " + userCredential.user.email)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  });
}


let ui = new firebaseui.auth.AuthUI(firebase.auth());

const uiConfig = {
  callbacks: {
    signInSuccessWithAuthResult: function(authResult, redirectUrl) {
      // User successfully signed in.
      // Return type determines whether we continue the redirect automatically
      // or whether we leave that to developer to handle.
      return true;
    },
    uiShown: function() {
      // The widget is rendered.
      // Hide the loader.
      document.getElementById('loader').style.display = 'none';
    }
  },
  // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
  signInFlow: 'popup',
  signInSuccessUrl: '/',
  signInOptions: [
    // Leave the lines as is for the providers you want to offer your users.
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    firebase.auth.FacebookAuthProvider.PROVIDER_ID,
    firebase.auth.TwitterAuthProvider.PROVIDER_ID,
    firebase.auth.GithubAuthProvider.PROVIDER_ID,
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.PhoneAuthProvider.PROVIDER_ID
  ],
  // Terms of service url.
  tosUrl: '<your-tos-url>',
  // Privacy policy url.
  privacyPolicyUrl: '<your-privacy-policy-url>'
};

ui.start('#firebaseui-auth-container', uiConfig);
