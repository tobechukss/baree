import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';

import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { SignIn } from './features/Login';
import Home  from './features/Home';

const auth = firebase.auth();
const firestore = firebase.firestore();
const analytics = firebase.analytics();



function App() {
  const [user] = useAuthState(auth);
  return (
    <div className="App">

      <section>
        {user ? <Home /> : <SignIn />}
      </section>

    </div>
  );
}

export default App;
