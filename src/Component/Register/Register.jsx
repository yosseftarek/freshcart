import React, { useState } from 'react'
import style from './Register.module.css'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'


// function validate(values) {//without yup
//     let errors = {};
//     if (!values.name) {
//         errors.name = "Name is required"
//     } else if (values.name.length < 3) {
//         errors.name = "min length is 3"
//     } else if (values.name.length > 10) {
//         errors.name = "max length is 10"
//     }

//     if (!values.password) {
//         errors.password = "Password is required"
//     } else if (!/^[A-Z][\w @]{3,8}$/.test(values.password)) {
//         errors.password = "Invalid Password"
//     }

//     return errors
// }

export default function Register() {
    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)
    let navigate = useNavigate()
    async function registerSubmit(values) {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
            .catch((err) => {
                setApiError(err.response.data.message)
                setLoading(false)
            })
        if (data.message == 'success') {
            setLoading(false)
            navigate('/login')
        }
    }

    let validationSchema = Yup.object({
        name: Yup.string().required('Name is required').min(3, "Min length is 3").max(10, 'Max lengh is 10'),
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}/, 'Invalid password'),
        rePassword: Yup.string().required('rePassword is required').oneOf([Yup.ref('password')], 'Password and rePasword dont matches'),
        phone: Yup.string().required('Phone is required').matches(/^01[0125][0-9]{8}/, 'We need Egyption number')
    })

    let formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            rePassword: '',
            phone: '',
        }, validationSchema
        //  , validate
        , onSubmit: registerSubmit
    })

    return <>
        <div className="w-75 mx-auto py-4">
            <h2>Register Now</h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className="alert alert-danger">{apiError}</div> : null}

                <label htmlFor="name">Name : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="text" id='name' name='name' className='form-control mb-3' />
                {formik.errors.name && formik.touched.name ? <div className='alert alert-danger py-2'>{formik.errors.name}</div> : null}

                <label htmlFor="email">Email : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

                <label htmlFor="rePassword">rePassword : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='rePassword' name='rePassword' className='form-control mb-3' />
                {formik.errors.rePassword && formik.touched.rePassword ? <div className='alert alert-danger py-2'>{formik.errors.rePassword}</div> : null}

                <label htmlFor="phone">phone : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="tel" id='phone' name='phone' className='form-control mb-3' />
                {formik.errors.phone && formik.touched.phone ? <div className='alert alert-danger py-2'>{formik.errors.phone}</div> : null}

                {loading ? <button type='button' className='btn bg-main text-light'>
                    <Puff
                        visible={true}
                        height="25"
                        width="25"
                        color="#fff"
                        ariaLabel="puff-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </button> :
                    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>Register</button>

                }
                <Link className='ps-3' to={'/login'}>Login Now</Link>

            </form>
        </div>
    </>
}
