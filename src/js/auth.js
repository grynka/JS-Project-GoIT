import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile , onAuthStateChanged, signOut} from "firebase/auth";
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

let uid;
authStatus();

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
    else if (event.submitter.id === 'exit') {
      authOut()
      event.submitter.disabled = true;
  }
    else if (event.submitter.id === 'status') {
        authStatus()
    }
    else if (event.submitter.id === 'favorite') {
    console.log(uid)
addFavorite(event.submitter.id, uid)
//getFavorite(event.submitter.id, uid)
    }

}

function getFavorite(category, id) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${id}/${category}.json`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function addFavorite(category, id) {
  const raw = JSON.stringify(category);

  const requestOptions = {
    method: 'PUT',
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${id}/${category}.json`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}


function authStatus() {
const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
  uid = user.uid
  console.log(uid)
  return  uid;


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

function authOut() {
  const auth = getAuth();
signOut(auth).then(() => {
  console.log("Sign-out successful.")
}).catch((error) => {
  // An error happened.
});
}
