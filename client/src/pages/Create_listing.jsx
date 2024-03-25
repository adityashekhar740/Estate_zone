import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";


function Create_listing() {
    const {currentUser}=useSelector((state)=>state.user);
  const [files, setFiles] = useState([]);
  const [imageUploadError, setimageUploadError] = useState(null);
  const [imguploading, setimguploading] = useState(false);
  const [error,setError]=useState(null);
  const navigate=useNavigate();
  const [formData, setFormData] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularPrice: 0,
    discountPrice: 0,
    offer: false,
    parking: false,
    furnished: false,
    userRef:currentUser._id
  });

  const handleImageSubmit = () => {
    setimguploading(true);
    if (
      files.length != 0 &&
      files.length < 7 &&
      formData.imageUrls.length < 7
    ) {
      setimageUploadError(null);
      const promises = [];
      for (let i = 0; i < files.length; i++) {
        promises.push(storeImg(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setimguploading(false);
        })
        .catch((err) => {
          setimageUploadError("image upload Failed");
          setimguploading(false);
        });
    } else {
      setimageUploadError("you can only upload 6 images per listing");
      setimguploading(false);
    }
  };

  const storeImg = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          // console.log(`upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };


  const handleRemoveImg = (img) => {
    const temp = formData.imageUrls.filter((image) => {
      return image !== img;
    });

    setFormData({
      ...formData,
      imageUrls: temp,
    });
  };
  const handleChange = (e) => {
    if (e.target.id === "rent" || e.target.id === "sell"){
        setFormData({ ...formData, type: e.target.id });
    }
    else if(e.target.id==='furnished'||e.target.id==='offer'|| e.target.id==='parking'){
        setFormData({...formData,[e.target.id]:e.target.checked})
    }
    else{
        setFormData({...formData,[e.target.id]:e.target.value})
    }
  };

  useEffect(()=>{
   formData.regularPrice=parseInt(formData.regularPrice);
   formData.discountedPrice=parseInt(formData.discountedPrice);
    if(formData.regularPrice-formData.discountPrice<0){
      setError('Discount price should be less than regular price');     
      
    }
    if(formData.regularPrice>=formData.discountPrice){
      setError(null);
    }
  },[formData])

//   useEffect(() => {
//     console.log(currentUser.username);
//   }, [formData]);

  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(formData.imageUrls.length===0){
      setError('you must upload at least one image for creating listing');
      return;
    }
     if(formData.regularPrice<formData.discountPrice){
      setError('Discount price should be less than regular price');
      return;
    }
    setError(null);
    try{
        const res=await axios.post('/api/listing/create', {
      ...formData,
      
    });
        console.log(res)
        navigate(`/listing/${res.data._id}`)
    }
    catch(e){
        console.log(e)
    }

  }

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7 ">
        Create A Listing
      </h1>
      <form onSubmit={(e)=>handleSubmit(e)} className="flex flex-col sm:flex-row gap-4 " action="">
        <div className="flex flex-col gap-4 flex-1 ">
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Name"
            className="border p-3 rounded-lg"
            maxLength={60}
            minLength={5}
            required
            id="name"
          />
          <textarea
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Description"
            className="border p-3 rounded-lg"
            rows={2}
            cols={10}
            required
            id="description"
          />
          <input
            onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Address"
            className="border p-3 rounded-lg"
            id="address"
            required
          />

          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e)}
                checked={formData.type === "sell"}
                type="checkbox"
                name=""
                id="sell"
                className="w-5"
              />
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e)}
                checked={formData.type === "rent"}
                type="checkbox"
                name=""
                id="rent"
                className="w-5"
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                name=""
                id="parking"
                className="w-5"
              />
              <span>Parking Spot</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                name=""
                id="furnished"
                className="w-5"
              />
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input
                onChange={(e) => handleChange(e)}
                type="checkbox"
                name=""
                id="offer"
                className="w-5"
              />
              <span>offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-y-3 ">
            <div className="flex gap-2 items-center">
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                name=""
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 border-gray-300 border-solid border-[0.5px] rounded-lg"
              />
              <p>Beds</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                name=""
                id="bathrooms"
                min={1}
                max={10}
                required
                className=" ml-[58px] p-3 border-gray-300 border-solid border-[0.5px] rounded-lg"
              />
              <p>Baths</p>
            </div>
            <div className="flex gap-2 items-center">
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                name=""
                id="regularPrice"
                min={15000}
                max={100000000}
                required
                className="p-3 border-gray-300 border-solid border-[0.5px] rounded-lg"
              />
              <div>
                <p>Regular Price</p>
                {
                  formData.type==='rent'?<span className="text-xs">(₹/month)</span>:null
                }
              </div>
            </div>
            {
              formData.offer?<div className="flex gap-2 items-center">
              <input
                onChange={(e) => handleChange(e)}
                type="number"
                name=""
                id="discountPrice"
                 min={15000}
                max={100000000}
                required
                className="p-3 border-gray-300 border-solid border-[0.5px] rounded-lg"
              />
              <div>
                <p>Discounted Price</p>
                 {
                  formData.type==='rent'?<span className="text-xs">(₹/month)</span>:null
                }
              </div>
            </div>:null
            }
          </div>
        </div>

        <div className="flex flex-col flex-1 gap-4 ">
          <p>Images:</p>
          <span className="font-normal text-gray-600 ml-2">
            The first image will be the cover (max 6)
          </span>
          <div className="flex gap-4">
            <input
              onChange={(e) => {
                setFiles(e.target.files);
              }}
              type="file"
              className="w-full border-gray-300 border-[0.5px] border-solid p-3 rounded-lg "
              name=""
              id="images"
              accept="image/*"
              multiple
            />
            <button
              disabled={imguploading}
              onClick={handleImageSubmit}
              type="button"
              className="p-3 text-green-700 border-green-700 border-solid border-[1.5px] disabled:opacity-85 rounded-sm font-semibold hover:shadow-lg "
            >
              {imguploading ? "uploading..." : "Upload"}
            </button>
          </div>
          <p className="text-red-700 text-[17px] text-center ">
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0
            ? formData.imageUrls.map((img, index) => (
                <div
                  className="flex justify-between px-2 border-solid border-gray-300 rounded-md border-[1px] p-3 "
                  key={index}
                >
                  <div>
                    <img width={84} src={img} alt="" />
                  </div>
                  <div>
                    <button
                      onClick={() => {
                        handleRemoveImg(img);
                      }}
                      type="button"
                      className="text-red-700 text-[18px] mt-[20%] "
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            : null}
          <button className="uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80 ">
            create listing
          </button>
          
        </div>
      </form>
      <p className="text-center mt-10 text-red-700 font-semibold " >{error && error}</p>
    </main>
  );
}

export default Create_listing;
