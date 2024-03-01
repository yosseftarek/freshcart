import React from 'react'
import style from "./Layout.module.css";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import { Outlet } from 'react-router-dom';
import { Offline } from "react-detect-offline";
export default function Layout() {

    return <>
        <Navbar />
        <div className="container">
            <Offline><div className="loading">
                <h2 className='fw-bold'>Only shown offline (surprise!)</h2>
            </div></Offline>
            <Outlet></Outlet>
        </div>
    </>
}
