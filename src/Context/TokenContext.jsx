import { createContext, useState } from "react";

export const TokenContext = createContext(undefined)


export function TokenProvider({ children }) {
    const [token, setToken] = useState(localStorage.getItem('token') || null)
    return (
        <TokenContext.Provider value={{ token, setToken }}>
            {children}
        </TokenContext.Provider>
    )
}