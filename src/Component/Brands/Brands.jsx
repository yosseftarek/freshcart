import React, { useEffect } from 'react'
import style from "./Brands.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { getBrands } from '../../Redux/BrandsSlice';
import { Puff } from 'react-loader-spinner';
export default function Brands() {
    let { brands, isLoading } = useSelector(({ brand }) => brand)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getBrands());
        console.log(isLoading)
    }, [])
    return <>
        <h2 className='text-center text-main fw-bold my-5'>All Brands</h2>
        {isLoading ?
            <div className="loading">
                <Puff
                    visible={true}
                    height="100"
                    width="100"
                    ariaLabel="puff-loading"
                    wrapperStyle={{}}
                    wrapperClass="d-flex justify-content-center mt-5"
                />
            </div> :
            <div className="row gy-3">
                {brands.map(brand =>
                    <div key={brand._id} className="col-md-3">
                        <div className="product p-2 border rounded">
                            <img src={brand.image} className='w-100' alt={brand.name} />
                            <p className='text-center fw-bold'>{brand.name}</p>
                        </div>
                    </div>
                )}
            </div>
        }

    </>
}
