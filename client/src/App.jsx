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
import { useSelector } from "react-redux";

function App() {
 
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
