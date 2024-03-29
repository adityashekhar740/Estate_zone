import React, { useEffect } from 'react'
import Filter from '../components/Filter';
import axios from 'axios';
import { getListingsStart,getListingsSuccess,getListingsFailure } from '../redux/Listings/Listings';
import { useSelector,useDispatch } from 'react-redux';
import Card from '../components/Card';

function Search() {
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

  return (
    <div className= '   flex bg-[#f1f5f1]   ' >
      <Filter/>
      <div className='p-8 border-b border-gray-300 w-[74%] ' >
        <h1 className='font-semibold text-[#334155] text-3xl text-center ' >All Listings</h1>
        {
          (Listings.length>0)?
          <div className='w-full flex flex-wrap gap-4 justify-center mt-10 ' >
            {
              Listings.map((listing,index)=>(
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