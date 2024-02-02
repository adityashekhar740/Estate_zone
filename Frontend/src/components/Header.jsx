import React from "react";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-slate-200 shadow-md  ">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
          <span className="text-slate-500">Estate</span>
          <span className="text-slate-500">Zone</span>
        </h1>
        <form className="bg-slate-100  rounded-lg flex items-center " action="">
          <input
            type="text"
            name=""
            id=""
            className="bg-transparent focus:outline-none py-3 pl-3 w-27 sm:w-64 "
            placeholder="Search..."
          />
          <FaSearch className="text-slate-600 mr-2 " />
        </form>
        <ul className="flex gap-4">
          <Link to={"/"}>
            <li className="hidden sm:inline  hover:border-b-2 border-[#2a2a2a]  cursor-pointer ">
              Home
            </li>
          </Link>
          <Link to={'/about'} >
            {" "}
            <li className="  hover:border-b-2 border-[#2a2a2a]  cursor-pointer ">
              About
            </li>
          </Link>
          <Link to={'/sign-in'} >
            <li className=" hover:border-b-2 border-[#2a2a2a]  cursor-pointer ">
              Sign in
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Header;
