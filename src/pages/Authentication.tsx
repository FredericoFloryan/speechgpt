import React, { useEffect, useState } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { FaApple } from 'react-icons/fa';

import { signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';



const Authentication = () => {
  const provider = new GoogleAuthProvider();

 
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider)
      .then(result => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        if (credential) {
          const token = credential.accessToken;
        }

        // The signed-in user info.
        console.log(result);
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch(error => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  const navigate = useNavigate();

  onAuthStateChanged(auth, user => {
    if (user) {
      console.log('LOGGED IN!!!');
      navigate('/Home');
    } else {
      console.log('NOPE');
    }
  });


  return (
    <div className=" min-h-screen flex flex-col justify-start items-center px-5 py-2 my-8">
      <button
        onClick={() => handleGoogleSignIn()}
        className="cursor-pointer border-custom_green-400 border flex items-center justify-center rounded-lg w-56 sm:w-80 m-2 p-2 relative top-20"
      >
        <FcGoogle fontSize={40} className="mr-4" />
        <span className="text-sm sm:text-base lg:text-lg">Sign in with Google</span>
      </button>

      <button className="cursor-pointer border-custom_green-400 border flex items-center justify-center rounded-lg w-56 sm:w-80 m-2 p-2 relative top-20">
        <FaApple fontSize={40} className="mr-4" />
        <span className="text-sm sm:text-base lg:text-lg">Sign in with Apple</span>
      </button>
    </div>
  );
};
export default Authentication;
