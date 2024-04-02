import React, { useEffect, useState } from 'react'
import Filter from '../components/Filter';
import axios from 'axios';
import { getListingsStart,getListingsSuccess,getListingsFailure } from '../redux/Listings/Listings';
import { useSelector,useDispatch } from 'react-redux';
import Card from '../components/Card';

function Search() {
  const [data,setdata]=useState([]);
  const {Listings,loading,error} = useSelector((state)=>state.Listings);
  const dispatch=useDispatch();
  useEffect(() => {
   const fetch_data=async()=>{
    dispatch(getListingsStart());
     try{
      const res=await axios.get('/api/listing/listings');
     dispatch(getListingsSuccess(res.data));
     }
     catch(e){
      console.log(e);
      dispatch(getListingsFailure("Server Error"));
     }
   }
   fetch_data();
  } , [])

  useEffect(()=>{
    setdata(Listings);
  },[Listings])

  return (
    <div className= '  flex flex-col sm:flex-row bg-[#f1f5f1]   ' >
      <div>
        <Filter/>
      </div>
      <div className=' w-[full] p-8 border-b border-gray-300 sm:w-[74%] ' >
        <h1 className='font-semibold text-[#334155] text-3xl text-center ' >All Listings</h1>
        {
          (data.length>0)?
          <div className='w-full flex flex-wrap gap-4 justify-center mt-10 ' >
            {
              data.map((listing,index)=>(
                  <Card listing={listing} />
              ))
            }
          </div>
          :null
        }
      </div>
    </div>
  )
}

export default Search