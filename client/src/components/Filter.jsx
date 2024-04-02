import React, { useEffect, useState } from "react";
import {
  getListingsStart,
  getListingsSuccess,
  getListingsFailure,
} from "../redux/Listings/Listings";
import { useSelector, useDispatch } from "react-redux";
import { setFilters } from "../redux/Filter/FilterSlice";

function Filter() {
  const [filtersState, setfiltersState] = useState({
    searchTerm: null,
    type: 'rentandsell',
    offer: false,
    parking: false,
    furnished: false,
    sort: "latest",
  });
  const [data, setdata] = useState([]);
  const { Listings, loading, error } = useSelector((state) => state.Listings);
  const { filters } = useSelector((state) => state.filter);
  useEffect(() => {
    setdata(Listings);
    }, []);
 
 
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { value, name, id, checked } = e.target;

    if (name === "searchTerm") {
      setfiltersState({ ...filtersState, [id]: e.target.value });
    } else if (name === "type") {
      const newType = checked ? id : null;
      setfiltersState({ ...filtersState, type: newType });
    } else if (name === "sort") {
      setfiltersState({ ...filtersState, sort: value });
    } else {
      const toggle= checked? true:false;
      setfiltersState({ ...filtersState, [id]: toggle });
    }
  };

  

  const handleSubmit = (e) => {

    var temp=[...data];
    if(filtersState.searchTerm){
     temp= temp.filter((listting)=>{
        return listting.name.toLowerCase().includes(filtersState.searchTerm.toLowerCase());
      })
    }
     if(filtersState.type){
      if(filtersState.type==='rent'){
     temp= temp.filter((listing)=>{
        return listing.type==='rent';
      })
      }     
      else if(filtersState.type==='sell'){
        temp= temp.filter((listing)=>{
          return listing.type==='sell';
        })
      }

    }
    if(filtersState.offer){
     temp=temp.filter((listing)=>{
       return listing.offer===true;
     })
   }
    
    if(filtersState.parking){
      temp=temp.filter((listing)=>{
        return listing.parking===true;
      })
    }
     if(filtersState.furnished){
      temp=temp.filter((listing)=>{
        return listing.furnished===true;
      })
    }
    if(filtersState.sort){
      if(filtersState.sort === 'priceHighToLow'){
        temp=temp.sort((a,b)=>b.regularPrice-a.regularPrice);
      }
      else if(filtersState.sort === "priceLowToHigh"){
        temp=temp.sort((a,b)=>a.regularPrice-b.regularPrice);
      }
      else if(filtersState.sort==='latest'){
        temp=temp.sort((a,b)=>new Date(b.createdAt)-new Date(a.createdAt));
      }
      else if(filtersState.sort==='oldest'){
        temp=temp.sort((a,b)=>new Date(a.createdAt)-new Date(b.createdAt));
      }
    }
    dispatch(getListingsSuccess(temp));
    dispatch(setFilters(filtersState));
  };

  return (
    <div className="w-[full] h-full border-r border-gray-300  px-4 pt-8 flex flex-col gap-7 ">
      <div className="flex gap-2 items-center ">
        <h1>Searching For :</h1>
        <input className=" w-[60%] py-[6px] px-1 focus:outline-none border-solid border-[1px] border-gray-300" onChange={(e)=>{handleChange(e)}} type="text" name="searchTerm" id="searchTerm" placeholder="search..." />
      </div>
      <div className=" flex items-start flex-row gap-3 sm:flex-col sm:gap-5">
        <h1 className=" ">Type:</h1>
        <div className="ml-[-10px]" >
          <input
          className="w-4 h-4 mr-1 "
            checked={filtersState.type === "rentandsell"}
            onChange={(e) => {
              handleChange(e);
            }}
            type="checkbox"
            name="type"
            id="rentandsell"
          />
          <label htmlFor="rentandsell">Rent&Sale</label>
        </div>
        <div>
          <input
          className="w-4 h-4 mr-1 "
            checked={filtersState.type === "rent"}
            onChange={(e) => {
              handleChange(e);
            }}
            type="checkbox"
            name="type"
            id="rent"
          />
          <label htmlFor="rent">Rent</label>
        </div>
        <div>
          <input
          className="w-4 h-4 mr-1 "
            checked={filtersState.type === "sell"}
            onChange={(e) => {
              handleChange(e);
            }}
            type="checkbox"
            name="type"
            id="sell"
          />
          <label htmlFor="sell">Sale</label>
        </div>
        <div>
          <input
          className="w-4 h-4 mr-2 "
            onChange={(e) => {
              handleChange(e);
            }}
            type="checkbox"
            name="offer"
            id="offer"
          />
          <label htmlFor="offer">Offer</label>
        </div>
      </div>
      <div className="flex flex-row gap-3 sm:flex-col ">
        <h1 className="mb-3">Amenities:</h1>
        <div>
          <input
          className="w-4 h-4 mr-2 "
            onChange={(e) => {
              handleChange(e);
            }}
            type="checkbox"
            name="parking"
            id="parking"
          />
          <label htmlFor="parking">Parking</label>
        </div>
        <div>
          <input
              className="w-4 h-4 mr-2 "
            onChange={(e) => {
              handleChange(e);
            }}
            type="checkbox"
            name="furnished"
            id="furnished"
          />
          <label htmlFor="furnished">Furnished</label>
        </div>
      </div>
      <div className="flex gap-2 items-center " >
        <h1>Sort By:</h1>
        <select
        className="py-[6px] px-[3px] border"
          onChange={(e) => {
            handleChange(e);
          }}
          name="sort"
          id=""
        >
          <option value="latest">Latest</option>
          <option value="priceHighToLow">Price High to Low</option>
          <option value="priceLowToHigh">Price Low to High</option>
          <option value="oldest">Oldest</option>
        </select>
      </div>
      <button
        onClick={(e) => {
          handleSubmit(e);
        }}
        className="uppercase bg-[#334155] text-white py-3 px-2 rounded-sm "
      >
        search
      </button>
    </div>
  );
}

export default Filter;
