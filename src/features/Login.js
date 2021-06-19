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

const loginButtonUrl = 'https://firebasestorgs://baree-41c3c.appspot.com/google-icon-white.pngage.googleapis.com/v0/b/image-identifier-415df.appspot.com/o/google-icon-white.png?alt=media&token=431cf4f2-5dc4-49c5-8f1a-5464663c8b88';

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




  