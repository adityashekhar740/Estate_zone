import React from 'react'
import { NavLink } from 'react-router-dom'
import { FaLocationDot } from "react-icons/fa6";

function Card({listing}) {
  return (
    <NavLink to={`/listing/${listing._id}`} className="w-[30%] min-w-[215px] flex flex-col gap-3 border-[0.5px] shadow-sm border-solid border-gray-300 rounded-lg  hover:border-gray-400 hover-border-[1px]  ">
                    {listing.imageUrls.length > 0 ? (
                      <img className='object-cover max-w-[100%] max-h-[242px] rounded-t-lg  '  src={listing.imageUrls[0]} alt="" />
                    ) : null}
                    <div className="flex flex-col gap-1 px-4 py-2 pb-4   ">
                      <h1 className="text-xl font-semibold  ">
                        {listing.name}
                      </h1>
                      <div className="flex gap-2 items-center text-sm ">
                        <FaLocationDot className="text-[red]" />
                        <p className="text-gray-700"> {listing.address}</p>
                      </div>
                      <p className="text-gray-700 text-sm ">
                        {listing.description}
                      </p>
                      {listing.discountPrice ? (
                        <h1 className="text-lg font-semibold text-[green] ">
                          ₹ {listing.discountPrice}
                          {listing.type === "rent" ? <span>/month</span> : null}
                        </h1>
                      ) : (
                        <h1 className="text-lg font-semibold text-[green] ">
                          ₹ {listing.regularPrice}
                          {listing.type === "rent" ? <span>/month</span> : null}
                        </h1>
                      )}
                      <div className="w-[35%] flex justify-between font-semibold ">
                        <span>{listing.bedrooms} Beds</span>
                        <span>{listing.bathrooms} Baths</span>
                      </div>
                    </div>
                  </NavLink>
  )
}

export default Card