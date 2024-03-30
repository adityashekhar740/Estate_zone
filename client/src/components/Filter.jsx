import React, { useEffect, useState } from 'react'
import { getListingsStart,getListingsSuccess,getListingsFailure } from '../redux/Listings/Listings'
import { useSelector,useDispatch } from 'react-redux'

function Filter() {
  const [data, setdata] = useState([]);
  const [Type, settype] = useState('all');
  const {Listings,loading,error}=useSelector((state)=>state.Listings);
  useEffect(()=>{
    setdata(Listings);
  },[Listings]);

  useEffect(()=>{
    console.log(data);
  },[data])
  
  const dispatch=useDispatch();

    const handleChange=(e)=>{     
      const temp=data.filter((listing)=>{
        return listing[e.target.id]===true;
      })
      setdata(temp);
    }

    const handleChangeType=(e)=>{
        settype(e.target.id);
         const temp=data.filter((listing)=>{
          return listing.type===e.target.id;
        })
        setdata(temp);
    }

    const handleSubmit=(e)=>{
      dispatch(getListingsSuccess(data));
    }
   

  return (
    <div className='w-[26%] h-full border-r border-gray-300  px-4 pt-8 flex flex-col gap-7 ' >
     <div className='flex gap-2' >
      <h1>Search Result For:</h1>
      <input type="text" name="searchTerm" id="searchTerm" />
     </div>
      <div className='flex-col gap-2' >
      <h1 className='mb-3' >Type:</h1>
      <div>
        <input checked={Type==='all'} onChange={(e)=>{handleChangeType(e)}} type="checkbox" name="all" id="all" />
        <label htmlFor="all">Rent&Sale</label>
      </div>
      <div>
        <input checked={Type==='rent'} onChange={(e)=>{handleChangeType(e)}} type="checkbox" name="rent" id="rent" />
        <label htmlFor="rent">Rent</label>
      </div>
      <div>
        <input checked={Type==='sell'} onChange={(e)=>{handleChangeType(e)}} type="checkbox" name="sell" id="sell" />
        <label htmlFor="sell">Sale</label>
      </div>
      <div>
        <input onChange={(e)=>{handleChange(e)}} type="checkbox" name="offer" id="offer" />
        <label htmlFor="offer">Offer</label>
      </div>
      </div>
      <div className='flex flex-col ' >
        <h1 className='mb-3' >Amenities:</h1>
        <div>
          <input onChange={(e)=>{handleChange(e)}} type="checkbox" name="parking" id="parking" />
          <label htmlFor="parking">Parking</label>
        </div>
        <div>
          <input onChange={(e)=>{handleChange(e)}} type="checkbox" name="furnished" id="furnished" />
          <label htmlFor="furnished">Furnished</label>
        </div>
      </div>
      <div>
        <h1>Sort By:</h1>
        <select name="" id="">
          <option value="">Latest</option>
          <option value="">Price High to Low</option>
          <option value="">Price Low to High</option>
          <option value="">Oldest</option>
        </select>
      </div>
      <button onClick={(e)=>{handleSubmit(e)}} className='uppercase bg-[#334155] text-white py-3 px-2 rounded-lg ' >search</button>

    </div>
  )
}

export default Filter