import React from 'react'
import { getListingsStart,getListingsSuccess,getListingsFailure } from '../redux/Listings/Listings'
import { useSelector,useDispatch } from 'react-redux'

function Filter() {
    const {Listings,loading,error}=useSelector((state)=>state.Listings);
    console.log(Listings);    
  return (
    <div className='w-[26%] h-full border-r border-gray-300 ' >Filter</div>
  )
}

export default Filter