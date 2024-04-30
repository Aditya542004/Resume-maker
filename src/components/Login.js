import React, { useState } from 'react';
import './App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { auth, firestore } from './Firebase';
import firebase from 'firebase/compat/app';
import { useNavigate } from 'react-router-dom';
import { FaFacebook,FaGoogle,FaLinkedinIn  } from "react-icons/fa";

function Login() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const navigate = useNavigate(); // Use 'useNavigate' instead of 'useHistory'
  const [activePanel, setActivePanel] = useState('sign-in');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };


  const handleSignUp = async () => {
    try {
      // Create a new user with email and password
      const userCredential = await auth.createUserWithEmailAndPassword(email, password);

      // Get the newly created user's UID
      const uid = userCredential.user.uid;

      // Store additional user data (display name) in Firestore
      await firestore.collection('users').doc(uid).set({
        displayName,
        email,
      });

      console.log('Sign-up successful!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      // Sign in with email and password
      await auth.signInWithEmailAndPassword(email, password);

      // Retrieve additional user data (display name) from Firestore
      const user = auth.currentUser;
      const userData = await firestore.collection('users').doc(user.uid).get();

      console.log('Sign-in successful!');
      console.log('User Data:', userData.data());
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };

  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await auth.signInWithPopup(provider);

      // Redirect to the home page or perform any other action upon successful login
      navigate('/');
    } catch (error) {
      console.error(error);
    }
  };


  const handlePanelToggle = (panel) => {
    setActivePanel(panel);
  };


  // const storeData = async () => {
  //   // Store data in Firebase Firestore
  //   await firestore.collection('users').doc('VY5TEfAWfJM81CjWInGj').set({
  //     name: 'value1',
  //     email: 'value2',
  //     pass:'value3',
  //   });
  // };

  // const retrieveData = async () => {
  //   // Retrieve data from Firebase Firestore
  //   const docRef = firestore.collection('users').doc('VY5TEfAWfJM81CjWInGj');
  //   const docSnapshot = await docRef.get();

  //   if (docSnapshot.exists()) {
  //     const retrievedData = docSnapshot.data();
  //     setData(retrievedData);
  //   }
  // };






  return (
    <div className={`container ${activePanel === 'sign-up' ? 'right-panel-active' : ''}`} id="container">
      <div className="form-container sign-up-container">
        <form action="#">
          <h1>Create Account</h1>
          <div className="social-container">
            <a onClick={signInWithGoogle}  className='social'> <FaFacebook /></a>
            <a onClick={signInWithGoogle}  className='social'> <FaGoogle /></a>
            <a onClick={signInWithGoogle}  className='social'> <FaLinkedinIn /></a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Display Name" value={displayName} onChange={handleDisplayNameChange} />
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <button onClick={handleSignUp}>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in-container">
        <form action="#">
          <h1>Sign in</h1>
          <div className="social-container">
            <a  onClick={signInWithGoogle}  className='social'> <FaFacebook /></a>
            <a onClick={signInWithGoogle}  className='social'> <FaGoogle /></a>
            <a onClick={signInWithGoogle}  className='social'> <FaLinkedinIn /></a>
            
          </div>
          <span>or use your account</span>
          <input type="email" placeholder="Email" value={email} onChange={handleEmailChange} />
          <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          <a href="/">Forgot your password?</a>
          <button onClick={handleSignIn}>Sign In</button>
         

        </form>
      </div>
      <div className="overlay-container">
        <div className="overlay">
          <div className="overlay-panel overlay-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button className="ghost" onClick={() => handlePanelToggle('sign-in')}>Sign In</button>
          </div>
          <div className="overlay-panel overlay-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start journey with us</p>

            <button className="ghost" onClick={() => handlePanelToggle('sign-up')}>Sign Up</button>
          </div>
        </div>
      </div>

      <footer>
        <p>
          Created with <i className="fa fa-heart"></i> by
          <a target="_blank" href="/">Resume Maker</a>
          .
        </p>
      </footer>
    </div>
  );

  // return (
  //   <div className="App">
  //     <header className="App-header">
  //       <h1>Firebase Authentication</h1>

  //       <div className="login-form">
  //         <input
  //           type="email"
  //           placeholder="Email"
  //           value={email}
  //           onChange={handleEmailChange}
  //         />
  //         <input
  //           type="password"
  //           placeholder="Password"
  //           value={password}
  //           onChange={handlePasswordChange}
  //         />
  //         <button onClick={signInWithEmailAndPassword}>Sign in with Email</button>
  //         <button onClick={signInWithGoogle}>Sign in with Google</button>
  //       </div>
  //     </header>
  //   </div>
  // );
}

export default Login;
