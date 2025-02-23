import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const TokenContext = createContext(undefined)


export function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    const [tokeninfo, settokeninfo] = useState(null)
    
    


    useEffect(() => {
        if (token) {
            const decoded = jwtDecode(token)
            settokeninfo(decoded)
            
            
        }
    }
        , [token])



    return (
        <TokenContext.Provider value={{ token, setToken, tokeninfo, settokeninfo }}>
            {children}
        </TokenContext.Provider>
    )
}