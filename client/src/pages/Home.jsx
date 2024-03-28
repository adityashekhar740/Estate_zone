import React from "react";
import Home_bg from "../assets/Home_bg.jpg";
import { GiHouseKeys } from "react-icons/gi";
import { IoHome } from "react-icons/io5";
import { NavLink } from "react-router-dom";


function Home() {
  return (
    <>
    <div className="w-full h-[88.6vh] relative ">
      <h1 className="absolute top-[14%] left-[7%] w-[30%] md:w-[50%] font-semibold  text-[white] z-3 text-[50px] " >Find your next <span  className="text-black">perfect</span> place 🏠 with ease...</h1>
      <div className=" p-4  h-[70%] w-[30%] absolute left-[64%] top-[15%] bg-white  z-3 rounded-sm " >
<h1 className="text-center text-[20px] md:text-[30px] mt-[7%] font-bold " >NAMASTE</h1>
<p className="text-center mt-[4%]" >EstateZone will help you find your home fast, easy and comfortable.
Our expert support are always available.</p>
    <div className="flex flex-col mt-[5%] h-[50%] w-full gap-[5%] " >
      <div className="h-[40%] mt-[5%] flex justify-center items-center " >
        <IoHome className="absolute top-[45%] text-gray-200 left-[23.5%] text-[36px] " />
        <NavLink to={'/search'} className=" flex justify-center items-center bg-[red] w-full h-full text-white text-lg rounded-sm hover:bg-red-600" >Buy new property</NavLink>
      </div>
      <div className="h-[40%] relative " >
        <GiHouseKeys className="absolute top-[31%] text-gray-200 left-[20%] text-[36px] " />
        <NavLink to={'/create-listing'} className=" flex justify-center items-center bg-[green] w-full h-full text-white text-lg rounded-sm hover:bg-green-600 " >Sell  old property</NavLink>
      </div>
    </div>
      </div>
      <img className="w-[100%] h-[100%] object-cover   " src={Home_bg} alt="" />
      <div className=" z-1  overlay absolute w-[100%] h-[100%]  top-0 left-0 bg-black opacity-[22%] "></div>
    </div>
    <section className="h-[50vh] w-[80%] mx-auto p-4 " >
    <h1 className="text-center text-[30px] mt-5 uppercase font-semibold" >Recent Listings</h1>
    
    </section>
    </>
  );
}

export default Home;
