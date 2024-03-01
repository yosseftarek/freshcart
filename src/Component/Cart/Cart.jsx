import React, { useContext, useEffect, useState } from 'react'
import style from "./Cart.module.css";
import { CartContext } from '../../Contexts/CartContext';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
export default function Cart() {
    const [loading, setLoading] = useState(true)
    const [cart, setcart] = useState([])
    let { getCartItems, deleteCartItems, updateCartItems, deleteUserCart } = useContext(CartContext);

    async function getItems() {
        let { data } = await getCartItems()
        setcart(data)
        setLoading(false)
    }
    async function deleteItems(id) {
        setLoading(true)
        let { data } = await deleteCartItems(id)
        setcart(data)
        setLoading(false)

    }
    async function deleteCart() {
        setLoading(true)
        await deleteUserCart()
        await getItems()
        setLoading(false)
    }
    async function updateItemQuantity(id, count) {
        if (count < 1) {
            let { data } = await deleteCartItems(id)
            setcart(data)
        }
        else {
            let { data } = await updateCartItems(id, count)
            setcart(data)
        }


    }

    useEffect(() => {
        getItems()
    }, [])
    return <>

        <div className="bg-light p-2 my-5 py-4">
            <h2 className='fw-bold h3'>Cart Shop</h2>
            {loading ?
                <div className="loading">
                    <Puff
                        visible={true}
                        height="100"
                        width="100"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass="d-flex justify-content-center mt-5"
                    />
                </div> : cart ? <>
                    {cart?.numOfCartItems > 0 ?
                        <>
                            <div className='d-flex justify-content-between'>
                                <p className='fw-bold px-5 py-4 h5'>total price :<span className='text-main'> {cart.data.totalCartPrice}</span></p>
                                <p className='fw-bold px-5 py-4 h5'>total number of items:<span className='text-main'> {cart.numOfCartItems}</span></p>
                            </div>
                            {cart.data.products.map(product => <div key={product.product.id} className='row m-0 px-5 py-2 align-items-center border-1 border-bottom'>
                                <div className="col-md-2">
                                    <div className="img">
                                        <img src={product.product.imageCover} className='w-100' alt={product.product.title} />
                                    </div>
                                </div>
                                <div className="col-md-10 d-flex justify-content-between">
                                    <div className="item">
                                        <h3 className='h5 fw-bold'>{product.product.title.split(' ').slice(0, 6).join(' ')}</h3>
                                        <p className='fw-bold font-sm '>{product.price} EGP</p>
                                        <button onClick={() => { deleteItems(product.product.id) }} className='btn p-0'><i className='fas fa-trash text-danger'></i> Remove</button>

                                    </div>
                                    <div className="count">
                                        <button onClick={() => { updateItemQuantity(product.product.id, product.count + 1) }} className='btnn px-2'>+</button>
                                        <span className='mx-3'>{product.count}</span>
                                        <button onClick={() => { updateItemQuantity(product.product.id, product.count - 1) }} className='btnn px-2'>-</button>
                                    </div>
                                </div>

                            </div>)}:</> : null} 
                    <div className="d-flex justify-content-center">
                        <button onClick={() => deleteCart()} className='text-center btnn mt-4 fw-bold'>Clear Your Cart</button>
                    </div><Link to={`/shippingadress/${cart.data._id}`} className='btn btn-primary'>Check out</Link>
                </> : <h2 className='text-text-capitalize fw-bold'> Your cart is empty</h2>}
        </div>
    </>
}

