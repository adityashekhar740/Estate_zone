import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import SignUp from "./pages/SignUp";
import  SignIn  from "./pages/SignIn";
import Header from "./components/Header";
import Profile from "./pages/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Create_listing from "./pages/Create_listing";
import EditListing from "./pages/EditListing";
import Listing from "./pages/Listing";
import Search from "./pages/Search";
import {CookiesProvider} from 'react-cookie';
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { LogOutStart,LogOutSuccess } from "./redux/user/userSlice";

function App() {
  const dispatch=useDispatch();
  const {currentUser}=useSelector((state)=>state.user);


  useEffect(()=>{
    const checkCookie=async()=>{
      try{
        const res=await axios.get('/api/auth/getCookie',{withCredentials:true});
      if(!res.data){
        dispatch(LogOutStart());
        dispatch(LogOutSuccess());
      }
      }
      catch(e){
        console.log(e);
      }
      
     
    }
  
      checkCookie();
    
    
  },[]);
 
  return (
   <>
      <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/about" element={<About />} />
        <Route path="/search" element={<Search/>} />
        <Route element={<PrivateRoute/>} >
          <Route path="/Profile" element={<Profile/>} />
          <Route path="/create-listing" element={<Create_listing/>} />
          <Route path="/editlisting/:id" element={<EditListing/>} />
        </Route>
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App
