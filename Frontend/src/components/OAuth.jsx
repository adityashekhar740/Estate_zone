import React from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import  { useState } from "react";
import {  useDispatch } from "react-redux";
import { signInFailure,signInSuccess,signInStart } from "../redux/user/userSlice";
import { useNavigate } from 'react-router-dom';

function OAuth() {
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [userData, setUserData] = useState({});
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);
      const result = await signInWithPopup(auth, provider);
      setUserData({
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      });
   
      const res = await fetch('/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          photo: result.user.photoURL,
        }),
      });
      const data = await res.json();
      dispatch(signInSuccess(data));
      navigate('/');

    } catch (e) {
      console.log(e)
      console.log("could not sign in  with google");
    }
  };
  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className="bg-red-700 p-3  text-white rounded-lg uppercase hover:opacity-95"
    >
      Continue With Google
    </button>
  );
}

export default OAuth;
