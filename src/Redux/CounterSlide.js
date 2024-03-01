import { createSlice } from "@reduxjs/toolkit";

let initialState = { count: 0, userName: '' }

let CounterSlide = createSlice({
    name: 'counterSlice',
    initialState,
    reducers: {
        increase: (state, action) => {
            state.count += 1
            // console.log(action.payload) =>undefined 34an mb3tlo4 7aga
        },
        decrease: (state, action) => {
            state.count -= 1

        },
        decreaseByAmount: (state, action) => {
            state.count += action.payload
            console.log(action.type)
        }
    }
})
export let CounterReducer = CounterSlide.reducer
export let { increase, decrease, decreaseByAmount } = CounterSlide.actions