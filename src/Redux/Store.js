import { configureStore } from "@reduxjs/toolkit";
import { CounterReducer } from "./CounterSlide";
import { BrandsReducer, brandReducer } from "./BrandsSlice";
import { categoriesReducer } from "./CategoriesSlice";

export let store = configureStore({
    reducer: {
        counter: CounterReducer,
        brand: BrandsReducer,
        categories:categoriesReducer
    }
})