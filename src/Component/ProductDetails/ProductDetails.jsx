import React, { useEffect, useState } from 'react'
import style from "./ProductDetails.module.css";
import axios from 'axios';
import { Puff } from 'react-loader-spinner';
import { useParams } from 'react-router-dom';
import Slider from "react-slick";
import { Helmet } from 'react-helmet';
export default function ProductDetails() {
    const [details, setDetails] = useState({})
    const [loading, setLoading] = useState(true)
    let { id } = useParams()
    var settings = {
        dots: false,
        arrows: false,
        autoplay: true,
        autoplayspeed: 2000,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    async function getProductDetails(id) {
        let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
        setLoading(false)
        setDetails(data.data)
    }
    useEffect(() => {
        getProductDetails(id)

    }, [])

    return <>
        {loading ?
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
            <>
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>{details.title}</title>
                </Helmet>
                <div className="row align-items-center">
                    <div className="col-md-4">
                        <Slider {...settings}>
                            {details.images.map(image => <img src={image} key={details.id} className='w-100' alt='details.title' />)}
                        </Slider>
                    </div>
                    <div className="col-md-8">
                        <div className="details">
                            <h3 className='h5'>{details.title}</h3>
                            <p className='py-3'>{details.description}</p>
                            <span className='font-sm text-main'>{details.category.name}</span>
                            <div className='d-flex justify-content-between align-items-center py-3'>

                                <span className='font-sm'>{details.price} EGP</span>
                                <span className='font-sm'>
                                    <i className='fas fa-star rating-color me-1'></i>
                                    {details.ratingsAverage}
                                </span>
                            </div>
                            <button className='btn bg-main text-main-light w-100 btn-sm'>Add To Cart</button>

                        </div>
                    </div>
                </div></>

        }
    </>
}
