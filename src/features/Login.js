import React, { useRef, useState } from 'react';


import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';



firebase.initializeApp({
    apiKey: "AIzaSyCaJclnCMJsWgtgh7iFgYwwneTRsj4sf3w",
    authDomain: "baree-41c3c.firebaseapp.com",
    projectId: "baree-41c3c",
    storageBucket: "baree-41c3c.appspot.com",
    messagingSenderId: "69793364244",
    appId: "1:69793364244:web:368183a1927f93674b6a01",
    measurementId: "G-HQ21TBF3BQ"
})


const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();

const loginButtonUrl = 'https://firebasestorage.googleapis.com/v0/b/baree-41c3c.appspot.com/o/google-icon-white.png?alt=media&token=55162799-626a-4756-9040-11d8b075df4f';

const styles = {
    backgroundImage: `url(${loginButtonUrl})`
}


export function SignIn() {
    

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <div className="login-container">
        <div onClick={signInWithGoogle} className="login-button">
            <div style={styles} className="google-logo">
                <span className="button-text">Sign In With Google</span>
            
            </div>
        </div>
    </div>
  )

}




  