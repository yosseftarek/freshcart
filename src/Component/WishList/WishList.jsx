import React, { useContext, useEffect, useState } from 'react'
import style from "./WishList.module.css";
import { CartContext } from '../../Contexts/CartContext';
import { WishListContext } from '../../Contexts/WishListContext';
import { Puff } from 'react-loader-spinner';
import toast from 'react-hot-toast';
export default function WishList() {
    const [loading, setLoading] = useState(true)
    const [wishList, setWishList] = useState(null)
    const [counter, setCounter] = useState(null)
    let { getWishListItems, deleteWishItems } = useContext(WishListContext);
    let { addToCart } = useContext(CartContext);
    async function postToCart(id) {
        let { data } = await addToCart(id);
        if (data.status == 'success') {
            toast.success(data.message, {
                duration: 2000
            })
        }
    }
    async function getItems() {
        let { data } = await getWishListItems()
        setCounter(data.count)
        setWishList(data.data)
        setLoading(false)

    }
    async function deleteItems(id) {
        setLoading(true)
        let { data } = await deleteWishItems(id)
        await getItems()
        setLoading(false)

    }
    useEffect(() => {
        getItems()

    }, [])
    return <>
        <div className="bg-light my-5 py-5">
            <h2 className='font-bold px-5 h4 '>My Wish List</h2>
            {loading ? <div className="loading">
                <Puff
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center mt-5"
                />
            </div> : counter > 0 ? <>
                {wishList?.map(wish =>
                    <div key={wish._id} className='row gy-3 px-5 py-2 m-0 border-bottom py-2 align-items-center'>
                        <div className="col-md-2">
                            <div className="img">
                                <img src={wish.imageCover} alt={wish.title} className='w-100' />
                            </div>
                        </div>
                        <div className="col-md-10 d-flex align-items-center justify-content-between">
                            <div className="main">
                                <h3 className='h5 fw-bold'>{wish.title.split(' ').splice(0, 6).join(' ')}</h3>
                                <p className='font-sm text-main fw-bold'>{wish.price} EGP</p>
                                <button onClick={() => { deleteItems(wish._id) }} className='btn p-0'><i className='fas fa-trash text-danger'></i> Remove</button>
                            </div>
                            <div className="add">
                                <button onClick={() => postToCart(wish._id)} className='btnn btn-lg '> add To Cart</button>
                            </div>
                        </div>
                    </div>)}
            </> : <h2 className='ms-5 h3 fw-bold mt-3'>You wishList is Empty</h2>}
        </div>
    </>
}
