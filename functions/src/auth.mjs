import { getAuth, signInWithEmailAndPassword, connectAuthEmulator } from "firebase/auth";
import * as app from 'firebase/app'

app.initializeApp({
  apiKey: "AIzaSyAtHFap1hzb0D_J37askgVxGd3GerrJRkI",
  authDomain: "linkhub-564ef.firebaseapp.com",
  projectId: "linkhub-564ef",
  storageBucket: "linkhub-564ef.appspot.com",
  messagingSenderId: "481564595019",
  appId: "1:481564595019:web:6004bcd95dedf674d0cece",
  measurementId: "G-N7QT1W5CYP"
});

const auth = getAuth();

connectAuthEmulator(auth, `http://localhost:9099`)

signInWithEmailAndPassword(auth, 'test@email.com', 'password')
  .then( async (userCredential) => {
    const user = userCredential.user;
    console.log(user)
    const token = await user.getIdToken()
    console.log(token)
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(error)
  });

export default auth;