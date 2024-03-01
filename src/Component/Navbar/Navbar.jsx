import React, { useContext, useEffect, useState } from 'react'
import style from "./Navbar.module.css";
import { Link, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { UserContext } from '../../Contexts/UserContext';
import { CartContext } from '../../Contexts/CartContext';
export default function Navbar() {
    let { getCartItems } = useContext(CartContext)
    const [cart, setCart] = useState(null)
    let { userToken, setUserToken } = useContext(UserContext)
    let navigate = useNavigate()
    function logOut() {
        localStorage.removeItem('userToken')
        setUserToken(null)
        navigate('/login')
    }
    async function getItems() {
        let { data } = await getCartItems()
        setCart(data?.numOfCartItems)
        await getItems()

    }
    useEffect(() => {
        getItems()
    }, [])
    return <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container">
                <Link className="navbar-brand" to={'/'}>
                    <img src={logo} alt="fresh cart" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                        {userToken != null ? <><li className="nav-item">
                            <Link className="nav-link" to={'/'}>Home</Link>
                        </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'cart'}>Cart</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'wishlist'}>wish list</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'products'}>Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'categories'}>Categories</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'brands'}>Brands</Link>
                            </li></> : null}


                    </ul>
                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

                        {userToken != null ? <>
                            <li className="nav-item position-relative">
                                <Link to={"/cart"} className="nav-link ng-star-inserted" href="/Ecommerce/cart">
                                    <i className="fa-solid fa-cart-shopping fs-3"></i>
                                    <div className="badge position-absolute text-white top-0 end-0 bg-main">{cart}</div>
                                </Link>
                            </li>
                            <li className="nav-item">
                                <span onClick={logOut} className="nav-link cursor-pointer">LogOut</span>
                            </li></> : <><li className="nav-item">
                                <Link className="nav-link" to={'register'}>Register</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to={'login'}>Login</Link>
                            </li></>}


                    </ul>
                </div>
            </div>
        </nav>
    </>
}
