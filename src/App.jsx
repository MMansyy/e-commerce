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
import { WhishListProvider } from "./Context/WhishListContext"
import Cart from "./pages/Cart/Cart"
import Proudcts from "./pages/Products/Proudcts"
import Account from "./pages/Account/Account"
import PersonalInfo from "./components/PersonalInfo/PersonalInfo"
import Privacy from "./components/Privacy/Privacy"
import WhishList from "./pages/WhishList/WhishList"
import Categories from "./pages/Categories/Categories"
import Category from "./pages/Category/Category"
import Brands from "./pages/Brands/Brands"
import Brand from "./pages/Brand/Brand"
import Orders from "./components/PesronalOrders/Orders"
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword"
import NotFOund from "./pages/NotFound/NotFOund"

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
          path: 'forgotpassword', element: <ForgotPassword />
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
        },
        {
          path: 'products', element:
            <ProtectedRoutes>
              <Proudcts />
            </ProtectedRoutes>
        },
        {
          path: 'whishlist', element:
            <ProtectedRoutes>
              <WhishList />
            </ProtectedRoutes>
        },
        {
          path: 'account', element:
            <ProtectedRoutes>
              <Account />
            </ProtectedRoutes>
          , children: [{
            index: true, element: <PersonalInfo />
          },
          {
            path: 'privacy', element: <Privacy />
          },
          {
            path: 'allorders', element:
              <Orders />
          }
          ]
        },
        {
          path: 'categories', element:
            <ProtectedRoutes>
              <Categories />
            </ProtectedRoutes>
        },
        {
          path: 'categories/:id', element:
            <ProtectedRoutes>
              <Category />
            </ProtectedRoutes>
        },
        {
          path: 'brands', element:
            <ProtectedRoutes>
              <Brands />
            </ProtectedRoutes>
        },
        {
          path: 'brands/:id', element:
            <ProtectedRoutes>
              <Brand />
            </ProtectedRoutes>
        },
        {
          path: '*', element: <NotFOund />
        }
      ]
    }
  ])

  return (
    <TokenProvider>
      <CartProvider>
        <WhishListProvider>
          <Toaster position="bottom-right" />
          <RouterProvider router={router} />
        </WhishListProvider>
      </CartProvider>
    </TokenProvider >
  )
}
