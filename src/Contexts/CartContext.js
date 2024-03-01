import axios from "axios";
import { createContext } from "react";

export let CartContext = createContext();

let headers = {
    token: localStorage.getItem('userToken')
}

export default function CartContextProvider(props) {
    function checkOut(cartId, shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`, {
            shippingAddress
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function addToCart(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`, {
            productId
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }

    function getCartItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function deleteCartItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function deleteUserCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }


    function updateCartItems(productId, count) {
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
            count
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }

    return <CartContext.Provider value={{ checkOut, addToCart, getCartItems, deleteCartItems, updateCartItems, deleteUserCart }}>
        {props.children}
    </CartContext.Provider>
}