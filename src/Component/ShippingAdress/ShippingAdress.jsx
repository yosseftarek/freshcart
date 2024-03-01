import React, { useContext } from 'react'
import style from "./ShippingAdress.module.css";
import { useFormik } from 'formik';
import { useParams } from 'react-router-dom';
import Cart from '../Cart/Cart';
import { CartContext } from '../../Contexts/CartContext';
export default function ShippingAdress() {
    let { cartId } = useParams()
    let { checkOut } = useContext(CartContext)
    async function checkout(values) {
        let { data } = await checkOut(cartId, values)
        if (data.status == 'success') {
            window.location.href = data.session.url
        }

    }
    let formik = useFormik({
        initialValues: {
            details: '',
            phone: '',
            city: ''
        }, onSubmit: checkout
    })
    return <>
        <h2>Shipping address</h2>
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <label htmlFor="details">details</label>
                <input onChange={formik.handleChange} type="text" id='details' name='details' className='mb-3 form-control' />
                <label htmlFor="phone">phone</label>
                <input onChange={formik.handleChange} type="tel" id='phone' name='phone' className='mb-3 form-control' />
                <label htmlFor="city">city</label>
                <input onChange={formik.handleChange} type="text" id='city' name='city' className='mb-3 form-control' />
                <button className='btn bg-main text-light' type='submit'>submit</button>
            </form>
        </div>
    </>
}
