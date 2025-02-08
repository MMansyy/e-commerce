import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";




export const CartContext = createContext(null)


const headers = {
    token: localStorage.getItem('token')
}


function addToCart(id) {
    return axios.post('https://ecommerce.routemisr.com/api/v1/cart',
        {
            productId: id
        },
        {
            headers
        }).then(res => res.data)
        .catch(err => err)
}

function removeFromCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers,
        }).then(res => res.data)
        .catch(err => err)
}


function getCart() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/cart', { headers })
        .then(res => res.data)
        .catch(err => err)
}






export const CartProvider = ({ children }) => {

    const [numOfCartItems, setNumOfCartItems] = useState(0)

    async function getCartHandler() {
        let res = await getCart()
        setNumOfCartItems(res.numOfCartItems);

    }


    useEffect(() => {
        getCartHandler()
    }, [])

    return <CartContext.Provider value={{ addToCart, getCart, removeFromCart, numOfCartItems, setNumOfCartItems }}>{children}</CartContext.Provider>
}