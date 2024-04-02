import React, { useEffect, useState } from "react";
import Home_bg from "../assets/Home_bg.jpg";
import { GiHouseKeys } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {  useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
function Home() {
  const [RecentListings, setRecentListings] = useState([]);
  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetch_listings = async () => {
      try {
        const res = await axios.get("/api/listing/recentListings");
        setRecentListings(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetch_listings();
  }, []);



  return (
    <>
      <div className="">
        <div className="w-full h-[92vh] relative flex   ">
          <h1 className="absolute top-[14%] left-[7%]  w-[60%] transitio duration-500  md:w-[50%] font-semibold  text-[white] z-3 text-[50px] ">
            Find your next <span className="text-black">perfect</span> place 🏠
            with ease...
          </h1>
          {/*  */}
          <div className="  top-[69%] left-[15%] w-[70%] p-4 h-[22%]  sm:h-[70%] sm:w-[30%] absolute sm:left-[64%] sm:top-[15%] bg-white  z-3 rounded-sm ">
            <h1 className=" mt-[1%] text-center text-[20px] md:text-[30px] sm:mt-[7%] font-bold ">
              NAMASTE
            </h1>
            <p className=" text-[10px]  sm:text-[16px] text-center mt-[4%]">
              EstateZone will help you find your home fast, easy and
              comfortable. Our expert support are always available.
            </p>
            {/*  */}
            <div className="  flex  sm:flex sm:flex-col mt-[5%] h-[44%] w-full gap-[5%] ">
              <div className=" h-[80%] sm:h-[40%]  w-[50%] sm:w-full mt-[5%]  ">
                <IoHome className="  hidden sm:block absolute top-[45%] text-gray-200 left-[23.5%] text-[36px] " />
                <NavLink
                  to={"/search"}
                  className=" text-[12px] flex justify-center items-center bg-red-500 w-full h-full text-white sm:text-lg rounded-sm hover:bg-red-600"
                >
                  Buy new property
                </NavLink>
              </div>
              <div className="h-[80%] sm:h-[40%] w-[50%] sm:w-full relative mt-[5%] ">
                <GiHouseKeys className=" hidden sm:block absolute top-[31%] text-gray-200 left-[20%] text-[36px] " />
                <NavLink
                  to={"/create-listing"}
                  className=" text-[12px] flex justify-center items-center bg-green-500 w-full h-full text-white sm:text-lg rounded-sm hover:bg-green-600 "
                >
                  Sell old property
                </NavLink>
              </div>
            </div>
          </div>
          <img
            className="w-[100%] h-[100%] object-cover rounded-b-[90px]  "
            src={Home_bg}
            alt=""
          />
          <div className=" z-1  overlay absolute w-[100%] h-[100%] rounded-b-[90px] top-0 left-0 bg-black opacity-[27%] "></div>
        </div>
        <section className="h-[75vh] w-[80%] mx-auto p-4 bg-[#f1f5f1] ">
          <h1 className="text-center text-[30px] mt-5 uppercase font-semibold">
            Recent Listings
          </h1>
          <div className="w-full mx-auto mt-4 flex gap-7  justify-center flex-wrap ">
            {RecentListings.length > 0
              ? RecentListings.map((listing, index) => (
                  <Card listing={listing} />
                ))
              : null}
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
