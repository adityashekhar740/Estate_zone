import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  // const formData = new FormData();
  const [file, setfile] = useState(null);
  const fileRef = useRef(null);
  const [proPic, setProPic] = useState("");
  const [filePerc, setFilePerc] = useState(null);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  // const [update, setUpdate] = useState(false);

  const handleChange = async (event) => {
    setfile(event.target.files[0]);
    // setUpdate(true)
  };

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  console.log(formData)
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

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form
        onSubmit={(e) => e.preventDefault()}
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
            className="rounded-full h-24 w-24 cursor-pointer mx-auto object-cover"
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
          name=""
          placeholder="username"
          className="border p-3 rounded-lg"
          id="username"
        />
        <input
          type="email"
          name=""
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
        />
        <input
          type="password"
          name=""
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
        />
        <button
          type="submit"
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5 px-2 pr-3">
        <span className="text-red-700 cursor-pointer font-semibold">
          Delete Account
        </span>
        <span className="text-red-700 cursor-pointer font-semibold">
          Log Out
        </span>
      </div>
    </div>
  );
}

export default Profile;
