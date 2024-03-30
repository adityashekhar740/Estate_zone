import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
     initialState:{
        searchTerm:null,
        type:{
            RentAndSale:true,
            Rent:false,
            Sale:false,
            offer:false
        },
        amenities:{
            parking: false, 
            furnished:false
        },
        sort:{
            priceHighToLow:false,
            priceLowToHigh: false,
            latest:false,
            oldest:false
        }
    },
    reducers:{

    }
    
})


export default filterSlice.reducer;