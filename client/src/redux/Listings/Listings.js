import { createSlice } from "@reduxjs/toolkit";


const listingSlice=createSlice({
    name:"listings",
    initialState:{
        Listings:null,
        loading:false,
        error:null,
    },
    reducers:{
        getListingsStart:(state)=>{
            state.loading=true;
        },    
        getListingsSuccess:(state,action)=>{
            state.Listings=action.payload;
            state.loading=false;
            state.error=null;
        },
        getListingsFailure:(state,action)=>{
            state.error=action.payload;
            state.loading=false;
        }
    }
})

export const {getListingsStart,getListingsSuccess,getListingsFailure}=listingSlice.actions;


export default listingSlice.reducer;