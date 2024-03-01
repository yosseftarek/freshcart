import axios from "axios";
import { createContext } from "react";

export let WishListContext = createContext();

let headers = {
    token: localStorage.getItem('userToken')
}

export default function WishListContextProvider(props) {
    function addToWishList(productId) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            productId
        }, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function getWishListItems() {
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    function deleteWishItems(productId) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
            headers
        })
            .then((response) => response)
            .catch((err) => err)
    }
    return <WishListContext.Provider value={{ addToWishList, getWishListItems,deleteWishItems }}>
        {props.children}
    </WishListContext.Provider>
}