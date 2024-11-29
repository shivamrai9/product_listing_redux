import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
    cards:[],
    loadings: false,
    error:null,
}


export const fetchcards= createAsyncThunk("cards/fetchCards",async ()=>{
    const response = await axios.get("https://fakestoreapi.com/products");
    return response.data;
})

const cardSlice = createSlice({
    name:"cards",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchcards.pending, (state)=>{
            state.loadings = true;
            state.error = null;
        })
        builder.addCase(fetchcards.fulfilled,(state,action)=>{
            state.loadings = false;
            state.cards = action.payload
        })
        .addCase(fetchcards.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message;
          });
    }
})

export default cardSlice.reducer;