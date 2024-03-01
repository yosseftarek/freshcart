import React, { useEffect } from 'react'
import style from "./Categories.module.css";
import { useDispatch, useSelector } from 'react-redux';
import { Puff } from 'react-loader-spinner';
import { getCategories } from '../../Redux/CategoriesSlice';
export default function Categories() {
    let { categories, isLoading } = useSelector(({ categories }) => categories)
    let dispatch = useDispatch()
    useEffect(() => {
        dispatch(getCategories());
        console.log(isLoading)
    }, [])
    return <>

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
            <div className="row gy-3 mt-5">
                {categories.map(category =>
                    <div key={category._id} className="col-md-4">
                        <div className="product rounded border">
                            <img src={category.image} height={250} className='w-100' alt={category.name} />
                            <p className='text-center fw-bold text-success h3 py-3'>{category.name}</p>
                        </div>
                    </div>
                )}
            </div>
        }

    </>
}
