import { createSlice } from "@reduxjs/toolkit";

const filterSlice=createSlice({
    name:"filter",
     initialState:{
       filters:null
    },
    reducers:{
        setFilters:(state,action)=>{
          state.filters=action.payload;
        },
     
    }
    
})

export const {setFilters}=filterSlice.actions;

export default filterSlice.reducer;