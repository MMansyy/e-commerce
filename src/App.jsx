import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Mainlayout from "./pages/Mainlayout/Mainlayout"
import Register from "./pages/Register/Register"
import Login from "./pages/Login/Login"
import './App.css'
import Home from "./pages/Home/Home"

export default function App() {

  const router = createBrowserRouter([
    {
      path: "/", element: <Mainlayout />,
      children: [
        {
          index: true, element: <Home />
        },
        {
          path: "register", element: <Register />
        },
        {
          path: 'login', element: <Login />
        },

      ]
    }
  ])

  return <RouterProvider router={router} />


}
