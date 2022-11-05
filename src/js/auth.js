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
    else if (event.submitter.id === 'addFavorite') {
    console.log(uid)
  setList("favorite", uid)
    }
    else if (event.submitter.id === 'addWatched') {
      console.log(uid)
  setList("watched", uid)
}
else if (event.submitter.id === 'favorite') {
  console.log(uid)
getList("favorite", uid)
setPage("favorite", uid)
}
else if (event.submitter.id === 'watched') {
  console.log(uid)
getList("watched", uid)
setPage("watched", uid)
}

else if (event.submitter.id === 'delete') {
  console.log(uid)
delItem(event.submitter.id, uid)
}
}

function getList(category, user) {
  const requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };
  
  fetch(`https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function setList(category, user) {
  const raw = `{"${JSON.stringify(Math.floor(Math.random() * 1000000))}" : "${user}"}`;
//
  const requestOptions = {
    method: 'PATCH',
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${category}.json`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function setPage(category, user) {
  const raw = `{"page" : "${category}"}`;
//
  const requestOptions = {
    method: 'PATCH',
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}.json`, requestOptions)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
}

function delItem(itemId, user) {
  const raw = `{"page" : "${category}"}`;
//
  const requestOptions = {
    method: 'DELETE',
    body: raw,
    redirect: 'follow'
  };
  
  fetch(`https://my-project-1521664687668-default-rtdb.europe-west1.firebasedatabase.app/usersid/${user}/${itemId}.json`, requestOptions)
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
  console.log("Вихід виконано")
}).catch((error) => {
  // An error happened.
});
}
