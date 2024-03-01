import React, { useContext, useState } from 'react'
import style from "./Login.module.css"
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { Puff } from 'react-loader-spinner'
import { UserContext } from '../../Contexts/UserContext'
export default function Login() {

    const [loading, setLoading] = useState(false)
    const [apiError, setApiError] = useState(null)
    let navigate = useNavigate()
    let { setUserToken } = useContext(UserContext)
    async function loginSubmit(values) {
        setLoading(true)
        let { data } = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin', values)
            .catch((err) => {
                setApiError(err.response.data.message)
                setLoading(false)
            })
        if (data.message == 'success') {
            setLoading(false)
            localStorage.setItem('userToken', data.token)
            setUserToken(data.token)
            navigate('/')
        }
    }

    let validationSchema = Yup.object({
        email: Yup.string().required('Email is required').email('Invalid email'),
        password: Yup.string().required('Password is required').matches(/^[A-Z][\w @]{5,8}/, 'Invalid password'),
    })

    let formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        }, validationSchema
        , onSubmit: loginSubmit

    })

    return <>
        <div className="container py-4 mt-5">
            <h2 className='h4 fw-bold'>login Now</h2>
            <form onSubmit={formik.handleSubmit}>
                {apiError ? <div className="alert alert-danger">{apiError}</div> : null}

                <label htmlFor="email">Email : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="email" id='email' name='email' className='form-control mb-3' />
                {formik.errors.email && formik.touched.email ? <div className='alert alert-danger py-2'>{formik.errors.email}</div> : null}

                <label htmlFor="password">Password : </label>
                <input onBlur={formik.handleBlur} onChange={formik.handleChange} type="password" id='password' name='password' className='form-control mb-3' />
                {formik.errors.password && formik.touched.password ? <div className='alert alert-danger py-2'>{formik.errors.password}</div> : null}

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
                    null
                }
                <div className="d-flex justify-content-between">
                    <Link className='hov fw-bold' to={'/forgetpass'}>Forget your password ?</Link>
                    <button disabled={!(formik.isValid && formik.dirty)} type='submit' className='btn bg-main text-light'>login</button>

                </div>
            </form>
        </div>
    </>
}
