import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ControlledCarousel from "../components/ControlledCarousel";
import { FaLocationDot } from "react-icons/fa6";
import { FaBed } from "react-icons/fa";
import { FaShower } from "react-icons/fa";
import { RiParkingBoxFill } from "react-icons/ri";
import { FaChair } from "react-icons/fa";
import { IoIosShareAlt } from "react-icons/io";

function Listing() {
  const [listingData, setListingData] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, setError] = useState(null);
  const [copy, setCopy] = useState(false);
  const id = useParams();

  useEffect(() => {
    const getData = async () => {
      setError(null);
      setloading(true);
      try {
        const res = await axios.get(`/api/listing/Getlisting/${id.id}`);
        setListingData(res.data);
        setloading(false);
      } catch (e) {
        console.log(e);
        setloading(false);
        setError(e);
      }
    };
    getData();
  }, []);

  return (
    <main>
      <div
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          setCopy(true);
          setTimeout(() => {
            setCopy(false);
          }, 2000);
        }}
        className="absolute top-[18%]  left-[87%] sm:left-[94%]  w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] z-[11] rounded-full flex justify-center items-center bg-[#f1f5f9] border cursor-pointer "
      >
        <IoIosShareAlt className="absolute  text-[25px]  z-[11] " />
      </div>
      {copy && (
        <div className="bg-[#f1f5f9] py-2 px-1 z-[11] absolute left-[39%] top-[15%]   sm:left-[91%] sm:top-[27%] ">
          Link Copied!!
        </div>
      )}

      {loading && <h1 className="text-center my-7 ">Loading...</h1>}
      {error && <h1 className="text-center my-7 ">Something went Wrong</h1>}
      {listingData && !loading && !error ? (


        <div className="w-full h-[100vh] ">
          <ControlledCarousel images={listingData.imageUrls} />
          <div className=" h-[40%] mx-[10%] sm:mx-auto w-[55%] mt-7 flex flex-col gap-[10px] pb-4 ">
            <div className="flex flex-col">
              <h1 className="text-[22px] font-semibold ">
                {listingData.name} - ₹ {listingData.regularPrice}{" "}
                <span>{listingData.type === "rent" ? "/month" : null}</span>{" "}
              </h1>
              <div className="flex gap-2 items-center">
                <FaLocationDot className="text-red-600" />
                <p>{listingData.address}</p>
              </div>
            </div>
            <div>
              <p>
                <span className="text-[18px]">Description - </span>
                {listingData.description}
              </p>
            </div>
            <button
              className={`${
                listingData.type === "sell" ? "bg-red-600" : "bg-green-600"
              } px-3 py-2 text-white w-[200px] sm:w-[20%] rounded-sm `}
            >
              {" "}
              For {listingData.type}
            </button>
            <div className=" flex flex-col gap-[10px]   2xl:flex 2xl:gap-3   ">
              <span className="text-[green] flex items-center gap-2  text-[14px] sm:text-[18px] ">
                {" "}
                •<FaBed />
                {listingData.bedrooms} Bed
              </span>
              <span className="text-[green] flex items-center gap-2 ">
                {" "}
                •<FaShower />
                {listingData.bathrooms} Bath
              </span>
              <span className="text-[green] flex items-center gap-2 ">
                {" "}
                •<RiParkingBoxFill />
                {listingData.parking ? null : "No"} Parking
              </span>
              <span className="text-[green] flex items-center gap-2 ">
                {" "}
                •<FaChair />
                {listingData.parking ? null : "Not"} Furnished
              </span>
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}

export default Listing;
