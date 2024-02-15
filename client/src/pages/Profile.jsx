import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import {updateUserSuccess,updateUserFailure,updateUserStart,deleteUserFailure,deleteUserSuccess,deleteUserStart, LogOutStart, LogOutSuccess, LogOutFailure} from '../redux/user/userSlice'
import {useDispatch,useSelector} from 'react-redux';

function Profile() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const { currentUser,loading,error } = useSelector((state) => state.user);
  // const formData = new FormData();
  const [file, setfile] = useState(null); 
  const fileRef = useRef(null);
  const [proPic, setProPic] = useState("");
  const [filePerc, setFilePerc] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [update, setUpdate] = useState(false);

  const handleChange = async (event) => {
    setfile(event.target.files[0]);
    // setUpdate(true)
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = () => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        console.log(error);
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setFormData({ ...formData, avatar: url });
        });
      }
    );
  };

  // useEffect(() => {
  //   if (profileImg !== null) {
  //     formData.append('image', profileImg);
  //     setUpdate(true); // Trigger update when image is selected
  //   }
  // }, [profileImg]);

  // useEffect(() => {
  //   const upload = async () => {
  //     if ( update && formData.get('image')) {

  //       setUpdate(false);
  //       try {

  //         const res = await axios.post('/api/user/upload', formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data',
  //           },
  //         });
  //         setProPic(res.data);
  //         console.log(proPic);
  //         console.log(res.data)

  //       } catch (error) {
  //         console.error('Error uploading image:', error);
  //       }
  //         // Reset update state after uploading
  //     }
  //   };
  //   upload();
  // }, [formData]);

  const handleupdate=(e)=>{
    setFormData({...formData,[e.target.id]: e.target.value})
  }

  const handlesubmit=async(e)=>{
    e.preventDefault();
    try{
      dispatch(updateUserStart())
      const res=await axios.post( `/api/user/update/${currentUser._id}`,formData,{
        headers:{
          "Content-Type":'application/json',
        },
      } )
      dispatch(updateUserSuccess(res.data))
      setUpdate(true);
      console.log(res)
    }
    catch(e){
      dispatch(updateUserFailure(e.response.data))
    }
  }
 
  const handleDelete=async()=>{
    dispatch(deleteUserStart())
     try{
       const res=await axios.delete(`/api/user/delete/${currentUser._id}`);
    // localStorage.removeItem("token");
    console.log(res)
    dispatch(deleteUserSuccess());
     }
    
   catch(e){
    dispatch(deleteUserFailure(e.response.data))
   }

  }

  const handleLogout=async()=>{
    try{
      dispatch(LogOutStart());
      const res=await axios.get('/api/auth/logout');
      dispatch(LogOutSuccess())
    console.log(res)

    }
    catch(e){
      dispatch(LogOutFailure(e))
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={(e) => {handlesubmit(e)}}
        className="flex flex-col gap-4"
        action=""
      >
        <input onChange={handleChange} hidden type="file" ref={fileRef} accept="image/*" />
        {formData.avatar? (
          <img
            src={formData.avatar}
            onClick={() => {
              fileRef.current.click();
            }}
            className="rounded-full h-24 w-24 cursor-pointer mx-auto object-cover"
            alt="ProfilePic"
          />
        ) : (
          <img
            src={currentUser.avatar}
            onClick={() => {
              fileRef.current.click();
            }}
            className="rounded-full h-24 w-24 cursor-pointer mx-auto object-cover "
            alt="ProfilePic"
          />
        )}

        <p className="mx-auto" >
          {fileUploadError ? (
            <span className="text-red-700">Error Image Upload</span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700" >Uploading{`${filePerc}%`}</span>
          ) : filePerc===100 ? (
            <span className="text-green-700" >Image Successfully Uploaded</span>
          ):('')
          }
        </p>

        <input
          type="text"
          
          defaultValue={currentUser.username}
          name=""
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
          onChange={(e)=>{handleupdate(e)}}
        />
        <input
          type="email"
          defaultValue={currentUser.email}
          name=""
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={(e)=>{handleupdate(e)}}
        />
        <input
          type="password"
          name=""
          defaultValue={currentUser.password}
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={(e)=>{handleupdate(e)}}
        />
        <button disabled={loading}
      
          type="submit"
          className="bg-slate-700 loading:opacity-85 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading? 'Loading...' : 'Update Profile'}
        </button>
        <Link className="bg-green-700 p-3 text-white text-center uppercase rounded-lg hover:opacity-95 " to={'/create-listing'} >Create Listing </Link>
      </form>
      <div className="flex justify-between mt-5 px-2 pr-3">
        <span onClick={handleDelete} className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span onClick={handleLogout} className="text-red-700 cursor-pointer font-semibold">
          Log Out
        </span>
      </div>
      <p className="text-center mt-[2rem] text-red-700 font-semibold" >{error && error }</p>
      <p className="text-center mt-[2rem] text-green-700 font-semibold  " >{update && 'USER UPDATED SUCCESSFULLY' }</p>
    </div>
  );
}

export default Profile;
