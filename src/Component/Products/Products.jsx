import React from 'react'
import style from "./Products.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { decrease, decreaseByAmount, increase } from '../../Redux/CounterSlide';
import FeaturedProducts from '../FeaturedProducts/FeaturedProducts';
export default function Products() {
    let { count } = useSelector(({ counter }) => counter)
    let dispatch = useDispatch()
    return <>
        {/* <h2>Products {count}</h2>
        <button className='btn btn-info' onClick={() => dispatch(increase())}>increase</button>
        <button className='btn btn-info mx-3' onClick={() => dispatch(decrease())}>decrease</button>
        <button className='btn btn-info ' onClick={() => dispatch(decreaseByAmount(10))}>decreaseByAmount</button> */}
        <FeaturedProducts></FeaturedProducts>
    </>
}
