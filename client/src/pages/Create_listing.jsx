import React from 'react'

function Create_listing() {
  return (
    <main className='p-3 max-w-4xl mx-auto' >
        <h1 className='text-3xl font-semibold text-center my-7 ' >Create A Listing</h1>
        <form className='flex flex-col sm:flex-row gap-4 ' action="">
            <div className='flex flex-col gap-4 flex-1 ' >
                <input type="text"  placeholder='Name' className='border p-3 rounded-lg' maxLength={60} minLength={10} required id='name' />
            <textarea type="text"  placeholder='Description' className='border p-3 rounded-lg' rows={2} cols={10} required id='Description' />
             <input type="text"  placeholder='Address' className='border p-3 rounded-lg'   id='Address' required />

            <div className='flex gap-6 flex-wrap' >
                <div className='flex gap-2' >
                    <input type="checkbox" name="" id="sell" className='w-5' />
                    <span>Sell</span>
                </div>
                <div className='flex gap-2' >
                    <input type="checkbox" name="" id="rent" className='w-5' />
                    <span>Rent</span>
                </div>
                <div className='flex gap-2' >
                    <input type="checkbox" name="" id="parking" className='w-5' />
                    <span>Parking Spot</span>
                </div>
                <div className='flex gap-2' >
                    <input type="checkbox" name="" id="furnished" className='w-5' />
                    <span>Furnished</span>
                </div>
                <div className='flex gap-2' >
                    <input type="checkbox" name="" id="offer" className='w-5' />
                    <span>offer</span>
                </div>
            </div>
            <div className='flex flex-wrap ' >
                <div className='flex gap-2 items-center' >
                    <input type="number" name="" id="bedrooms" min={1} max={10} required className='p-3 border-gray-300 border-solid border-[0.5px] rounded-lg' />
                    <p>Beds</p>
                </div>
                <div className='flex gap-2 items-center' >
                    <input type="number" name="" id="bathrooms" min={1} max={10} required className='p-3 border-gray-300 border-solid border-[0.5px] rounded-lg' />
                    <p>Baths</p>
                </div>
                <div className='flex gap-2 items-center' >
                    <input type="number" name="" id="regularPrice" min={1} max={10} required className='p-3 border-gray-300 border-solid border-[0.5px] rounded-lg' />
                   <div>
                     <p>Regular Price</p>
                     <span className='text-xs' >($/month)</span>
                   </div>
                </div>
                <div className='flex gap-2 items-center' >
                    <input type="number" name="" id="discountPrice" min={1} max={10} required className='p-3 border-gray-300 border-solid border-[0.5px] rounded-lg' />
                    <div>
                        <p>Discounted Price</p>
                        <span className='text-xs' >($/month)</span>
                    </div>
                </div>
            </div>
            </div>

            <div className='flex flex-col flex-1 gap-4 ' >
                <p>Images:</p>
                <span className='font-normal text-gray-600 ml-2' >The first image will be the cover (max 6)</span>
                <div className="flex gap-4">
                    <input type="file" className='w-full border-gray-300 border-[0.5px] border-solid p-3 rounded-lg ' name="" id="images" accept='image/*' multiple />
                    <button className='p-3 text-green-700 border-green-700 border-solid border-[1.5px] rounded-sm font-semibold hover:shadow-lg ' >Upload</button>
                </div>
            <button className='uppercase p-3 bg-slate-700 rounded-lg text-white hover:opacity-95 disabled:opacity-80 ' >create listing</button>
            </div>
        </form>
    </main>
  )
}

export default Create_listing