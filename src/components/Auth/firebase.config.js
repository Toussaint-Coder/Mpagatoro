import {initializeApp} from "firebase/app"
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyCs3DRWp0LFNoOMQdNEz8vLxK7OfOZXpxs",
  authDomain: "mpagatoro.firebaseapp.com",
  projectId: "mpagatoro",
  storageBucket: "mpagatoro.appspot.com",
  messagingSenderId: "739065075721",
  appId: "1:739065075721:web:ccbb0cff39daaeb841c0d8",
}
const app = initializeApp(firebaseConfig)

const auth = getAuth(app)

const provider = new GoogleAuthProvider()

export {auth, provider, firebaseConfig}
