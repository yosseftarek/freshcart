import React from 'react'
import style from "./ForgetPass.module.css";
export default function ForgetPass() {
    return <>
        <div className="container mt-5">
            <h2 className='fw-bold pb-3 h3'>please enter your verification code</h2>
            <input type="email" className='form-control' placeholder='Email' />
            <button className='btn btn-outline-success mt-4'>Verify</button>
        </div>
    </>
}
