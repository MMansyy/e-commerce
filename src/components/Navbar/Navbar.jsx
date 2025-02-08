import { useContext, useEffect, useState } from 'react';
import logo from '../../assets/freshcart-logo.svg'
import { IoMdClose } from "react-icons/io";
import { IoMenuOutline } from "react-icons/io5";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { PiTrolleyFill } from 'react-icons/pi';
import { CiHeart } from 'react-icons/ci';
import { TokenContext } from '../../Context/TokenContext';
import './Navbar.css'
import { CartContext } from '../../Context/CartContext';


export default function Navbar() {
  const [toggeld, settoggeld] = useState(false)
  const { token, setToken } = useContext(TokenContext)
  const { numOfCartItems } = useContext(CartContext)
  const navigate = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('hasVisited')
    setToken(null)
    navigate('/login')
  }



  return (
    <nav className="bg-white shadow dark:bg-gray-800 sticky top-0 inset-x-0 z-50">
      <div className="container px-6 py-7 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <Link to={'/'}>
              <img className="w-full" src={logo} alt />
            </Link>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button type="button" onClick={() => settoggeld(!toggeld)} className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400" aria-label="toggle menu">
                {!toggeld && <IoMenuOutline size='25px' />}
                {toggeld && <IoMdClose size='25px' />}
              </button>
            </div>
          </div>
          <div className={`${toggeld ? 'block' : 'hidden'} absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}>
            <div className="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              {token && <>
                <NavLink to='/' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 nav-special">Home</NavLink>
                <NavLink to='/login' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 nav-special">Products</NavLink>
                <NavLink to='/register' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 nav-special">Categories</NavLink>
                <NavLink to='/login' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200 nav-special">Brands</NavLink>
                <div className="relative mt-4 lg:mt-0 lg:mx-4">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input type="text" className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800 dark:text-gray-300 focus:outline-none focus:border-gray-600" placeholder="Search" />
                </div>

              </>}
            </div>
            <div className="flex justify-center items-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
              {token && <>
                <Link to='/cart' className="mx-2 text-gray-600 transition-colors duration-300 transform relative dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Reddit">
                  <PiTrolleyFill className='text-2xl' />
                  <span className="absolute -top-2.5 -right-2.5 inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                    {numOfCartItems}
                  </span>
                </Link>
                <Link to='' className="mx-2 text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:text-gray-500 dark:hover:text-gray-300" aria-label="Facebook">
                  <CiHeart className='text-2xl' />
                </Link>
              </>}
              {!token && <>
                <Link to='/login' className="mx-4 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200">Login</Link>
                <Link to='/register' className="mx-4 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200">Register</Link>
              </>}
              {token && <Link onClick={() => { handleLogout() }} className="mx-4 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200">Logout</Link>
              }
            </div>
          </div>
        </div>
      </div>
    </nav >

  )
}
