import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Mainlayout from "./pages/Mainlayout/Mainlayout"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import './App.css'
import Home from "./pages/Home/Home"
import { TokenProvider } from "./Context/TokenContext"
import ProtectedRoutes from "./components/protectedRoutes/ProtectedRoutes"
import ProductItem from "./pages/ProductItem/ProductItem"
import { Toaster } from "react-hot-toast"
import { CartProvider } from "./Context/CartContext"
import Cart from "./pages/Cart/Cart"

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Mainlayout />,
      children: [
        {
          path: "register", element: <Register />
        },
        {
          path: 'login', element: <Login />
        },
        {
          index: true, element:
            <ProtectedRoutes>
              <Home />
            </ProtectedRoutes>
        },
        {
          path: 'product/:id', element:
            <ProtectedRoutes>
              <ProductItem />
            </ProtectedRoutes>
        },
        {
          path: 'cart', element:
            <ProtectedRoutes>
              <Cart />
            </ProtectedRoutes>
        }
      ]
    }
  ])

  return (
    <TokenProvider>
      <CartProvider>
        <Toaster position="bottom-right" />
        <RouterProvider router={router} />
      </CartProvider>
    </TokenProvider>
  )


}
