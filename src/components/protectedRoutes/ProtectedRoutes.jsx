import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { TokenContext } from "../../Context/TokenContext"

export default function ProtectedRoutes({ children }) {

    const { token } = useContext(TokenContext)

    if (token ) {
        return children 
    }
    return <Navigate to='/login' />
}
