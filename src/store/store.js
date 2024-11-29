import { configureStore } from "@reduxjs/toolkit";
import cardReducer from './cardsSlice'

const store = configureStore({
    reducer:{
        cards: cardReducer,
    }
})

export default store;