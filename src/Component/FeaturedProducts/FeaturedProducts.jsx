import React, { useContext, useEffect, useState } from 'react'
import style from "./FeaturedProducts.module.css";
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { CartContext } from '../../Contexts/CartContext';
import toast from 'react-hot-toast';
import { WishListContext } from '../../Contexts/WishListContext';

export default function FeaturedProducts() {

    // const [loading, setLoading] = useState(true)
    // const [products, setProducts] = useState([])
    // async function getProducts() {
    //     let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    //     setProducts(data.data)
    //     setLoading(false)
    // }
    // useEffect(() => {
    //     getProducts()
    // }, [])
    function getProducts() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/products`)
    }
    let { data, isLoading, isFetching } = useQuery('featuredProducts', getProducts, {
        // cacheTime:3000,
        // refetchOnMount:false,
        // refetchOnWindowFocus:false,
        // staleTime:6000,
        // refetchInterval:1000,
        // refetchOnReconnect:false,
        // enabled:false
    });
    const [loading, setLoading] = useState(true)
    const [wishList, setWishList] = useState([])
    let { addToCart } = useContext(CartContext);
    let { addToWishList } = useContext(WishListContext);
    async function postToCart(id) {
        let { data } = await addToCart(id);
        if (data.status == 'success') {
            toast.success(data.message, {
                duration: 2000
            })
        }
    }

    async function postToWishList(id) {
        let { data } = await addToWishList(id);
        setWishList(data)
        setLoading(false)
        if (data.status == 'success') {
            toast.success(data.message + '❤️', {
                duration: 2000, position: 'top-right'
            })
        }

    }
    return <>

        {isLoading ?
            <div className="">
                <Puff
                    visible={true}
                    height="100"
                    width="100"

                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center mt-5"
                />
            </div> :
            <div className="row gy-4 mt-5">
                {data?.data.data.map(product =>

                    <div key={product.id} className="col-md-3">

                        <div className="product p-2 rounded">
                            <Link to={`/productdetails/${product.id}`}>
                                <img src={product.imageCover} className='w-100' alt={product.title} />
                                <span className='font-sm text-main fw-bold'>{product.category.name}</span>
                                <h3 className='h6 fw-bold my-2'>{product.title.split(" ").splice(0, 2).join(" ")}</h3>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span className='font-sm fw-bold'>{product.price} EGP</span>
                                    <span className='font-sm fw-bold'>
                                        <i className='fas fa-star rating-color me-1'></i>
                                        {product.ratingsAverage}
                                    </span>
                                </div>

                            </Link>
                            <div className='d-flex justify-content-end align-items-center'>
                                <i onClick={() => postToWishList(product.id)} className="fa-solid fa-heart h3 me-3 mt-3"></i>
                            </div>
                            <button onClick={() => postToCart(product.id)} className='btn bg-main text-main-light w-50 mx-auto d-flex justify-content-center'> + Add</button>
                        </div>
                    </div>

                )}
            </div>
        }
    </>
}
