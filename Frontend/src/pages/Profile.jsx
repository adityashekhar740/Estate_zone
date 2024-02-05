import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Profile() {
  const formData = new FormData();
  const [profileImg, setProfileImg] = useState(null);
  const fileRef = useRef(null);
  const [proPic, setProPic] = useState('');
  const { currentUser } = useSelector((state) => state.user);

  const handleChange = async (event) => {
    setProfileImg(event.target.files[0]);
  };

 useEffect(() => {
  
  if (profileImg !== null) {
    formData.append('image', profileImg);
    
    const upload = async () => {
      try {
        const res = await axios.post('/api/user/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        setProPic(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    };

 // upload();                //&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&uncomment  DURING PRODUCTION 
  }
}, [profileImg]);


  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4" action="">
        <input onChange={handleChange} hidden type="file" ref={fileRef} />
      {
        (proPic)? <img
  src={`../../../api/public/images/uploads/${proPic}`}
  onClick={() => {
    fileRef.current.click();
  }}
  className="rounded-full h-24 w-24 cursor-pointer mx-auto object-cover"
  alt="ProfilePic"
/>:
 <img
  src={currentUser.avatar}
  onClick={() => {
    fileRef.current.click();
  }}
  className="rounded-full h-24 w-24 cursor-pointer mx-auto object-cover"
  alt="ProfilePic"
/>
      }

        <input type="text" name="" placeholder="username" className="border p-3 rounded-lg" id="username" />
        <input type="email" name="" placeholder="email" className="border p-3 rounded-lg" id="email" />
        <input type="password" name="" placeholder="password" className="border p-3 rounded-lg" id="password" />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5 px-2 pr-3">
        <span className="text-red-700 cursor-pointer font-semibold">Delete Account</span>
        <span className="text-red-700 cursor-pointer font-semibold">Log Out</span>
      </div>
    </div>
  );
}

export default Profile;
