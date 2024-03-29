import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const { currentUser } = useSelector((state) => state.user);
  if(!currentUser){
    <Navigate to='/home' />
  }
  return (
    <div className="bg-slate-200 shadow-md  ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to={'/'} className="font-bold text-sm sm:text-xl flex flex-wrap cursor-pointer ">
          <span className="text-slate-500">Estate</span>
          <span className="text-slate-500">Zone</span>
        </Link>
        <form className="bg-slate-100  rounded-[5px] flex items-center " action="">
          <input
            type="text"
            name=""
            id=""
            className="bg-transparent focus:outline-none py-[10px] pl-3 w-27 sm:w-64 "
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600 mr-2 " />
        </form>
        <ul className="flex gap-4 items-center ">
          <Link to={"/"}>
            <li className="hidden sm:inline  hover:border-b-2 border-[#2a2a2a]  cursor-pointer ">
              Home
            </li>
          </Link>
          <Link to={"/about"}>
            {" "}
            <li className="  hover:border-b-2 border-[#2a2a2a]  cursor-pointer ">
              About
            </li>
          </Link>

          <Link to={"/Profile"}>
            {currentUser ? (
              <img
                className="h-[41px] border-solid border-[0.1px] border-gray-600 w-[41px] rounded-3xl object-cover hover:h-[41.1px] hover:w-[41.2px] hover:transition-all duration-3000 ease-in-out"
                src={currentUser.avatar}
                alt="userimg"
              />
            ) : (
              <li className=" hover:border-b-2 border-[#2a2a2a]  cursor-pointer ">
                Sign in
              </li>
            )}
              </Link>
          
        </ul>
      </div>
    </div>
  );
};

export default Header;
