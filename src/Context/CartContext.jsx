import axios from "axios";
import { useContext, useState } from "react";
import { useEffect } from "react";
import { createContext } from "react";
import { TokenContext } from "./TokenContext";




export const CartContext = createContext(null)









export const CartProvider = ({ children }) => {

    const [numOfCartItems, setNumOfCartItems] = useState(0)
    const { token } = useContext(TokenContext)
    const headers = {
        token: localStorage.getItem('token')
    }

    async function getCartHandler() {
        if (!token) return
        let res = await getCart()
        setNumOfCartItems(res.numOfCartItems);
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


    function createCashOrder(id, values) {


        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${id}`,
            { shippingAddress: values },
            { headers }
        ).then((res) => {
            if (res.data.status == 'success') {
                setNumOfCartItems(0)
                return res.data
            } else {
                return
            }
        })
            .catch((err) => console.log(err))
    }


    function createOnlineOrder(id, values) {
        const port = window.location.origin
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${id}?url=${port}/account`,
            { shippingAddress: values },
            { headers }
        ).then((res) => {
            if (res.data.status == 'success') {
                setNumOfCartItems(0)
                window.location.href = `${res.data.session.url}`
            } else {
                return
            }
        })
            .catch((err) => console.log(err))
    }


    useEffect(() => {
        getCartHandler()
    }, [token])

    return <CartContext.Provider value={{ addToCart, getCart, removeFromCart, numOfCartItems, setNumOfCartItems, createCashOrder, createOnlineOrder }}>{children}</CartContext.Provider>
}