import axios from "axios";
import { useContext, useEffect } from "react";
import { createContext } from "react";
import { TokenContext } from "./TokenContext";



export const WhishListContext = createContext(undefined);




export function WhishListProvider({ children }) {

    const { token: hamada } = useContext(TokenContext)

    const headers = {
        token: hamada
    }

    console.log(headers);



    function addToWhishList(id) {
        return axios.post('https://ecommerce.routemisr.com/api/v1/wishlist'
            , { productId: id }, { headers })
            .then(res => res.data)
            .catch(err => err.response.data)

    }

    function getWhishList() {
        return axios.get('https://ecommerce.routemisr.com/api/v1/wishlist', { headers })
            .then(res => res.data)
            .catch(err => err.response.data)
    }

    function removeFromWhishList(id) {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, { headers })
            .then(res => res.data)
            .catch(err => err.response.data)
    }



    return (
        <WhishListContext.Provider value={{ addToWhishList, getWhishList, removeFromWhishList }}>
            {children}
        </WhishListContext.Provider>
    )
}