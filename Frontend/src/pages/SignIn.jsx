import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
function SignIn() {
  const [formData, setFormData] = useState({});
  const [loading,setLoading]=useState(false);
  const [Error,setError]=useState('');
  const Navigate=useNavigate();
  const handlechange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (e) => {
    setError('');
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("/api/auth/signin", formData);      
      Navigate('/');
    } catch (e) {
      setError(e.response.data);
    }
    setLoading(false);
  };
  return (
    <div className="p-3 max-w-lg mx-auto  mt-[100px] ">
      <h1 className="font-semibold my-7 text-3xl text-center ">Sign In</h1>
       <div>
        {Error?<p className="text-red-500 text-lg text-center " >{Error}</p>:null}
      </div>
      <form className="flex flex-col gap-4" action="">
        <input
          className="border p-3 rounded-lg"
          placeholder="Username"
          name="username"
          onChange={handlechange}
          type="text"
          id="username"
        />
        <input
          className="border p-3 rounded-lg"
          type="password"
          placeholder="Password"
          onChange={handlechange}
          name="password"
          id="password"
        />
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="bg-slate-700 disabled:opacity-80 text-white p-3 rounded-lg uppercase hover:opacity-95 "
        >
          {loading?'loading...':'sign up'}
        </button>
      </form>
      <div className="flex gap-2 mt-4 ">
        <p>Dont Have An Account?</p>
        <Link className="text-blue-600 text-[18px] mt-[-2px] " to={"/signup"}>
          Sign Up
        </Link>
      </div>
     
    </div>
  );
}

export default SignIn;
