import axios from "axios";
import { useEffect } from "react";
import { createContext } from "react";



export const WhishListContext = createContext(undefined);

const headers = {
    token: localStorage.getItem('token')
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



export function WhishListProvider({ children }) {


    return (
        <WhishListContext.Provider value={{ addToWhishList, getWhishList, removeFromWhishList }}>
            {children}
        </WhishListContext.Provider>
    )
}