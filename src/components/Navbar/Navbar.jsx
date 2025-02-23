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
import { FaUserCircle } from 'react-icons/fa';

export default function Navbar() {
  const [toggeld, settoggeld] = useState(false)
  const { token, setToken, tokeninfo, settokeninfo } = useContext(TokenContext)
  const { numOfCartItems } = useContext(CartContext)
  const navigate = useNavigate()
  const [user, setuser] = useState(false)



  function handleLogout() {
    localStorage.removeItem('token')
    localStorage.removeItem('hasVisited')
    setToken(null)
    navigate('/login')
  }



  return (
    <nav className="bg-white shadow  sticky top-0 inset-x-0 z-50">
      <div className="container px-6 py-7 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <Link to={'/'}>
              <img className="w-full" src={logo} alt />
            </Link>
            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button type="button" onClick={() => settoggeld(!toggeld)} className="text-gray-500  hover:text-gray-600  focus:outline-none focus:text-gray-600 " aria-label="toggle menu">
                {!toggeld && <IoMenuOutline size='25px' />}
                {toggeld && <IoMdClose size='25px' />}
              </button>
            </div>
          </div>
          <div className={`${toggeld ? 'max-h-96' : 'max-h-0 hidden'}  absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white  lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between`}>
            <div className="flex flex-col text-center text-gray-600 capitalize  lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              {token && <>
                <NavLink onClick={() => settoggeld(false)} to='/' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900  nav-special">Home</NavLink>
                <NavLink onClick={() => settoggeld(false)} to='/products' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900  nav-special">Products</NavLink>
                <NavLink onClick={() => settoggeld(false)} to='/categories' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900  nav-special">Categories</NavLink>
                <NavLink onClick={() => settoggeld(false)} to='/brands' className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900  nav-special">Brands</NavLink>
                {/* <div className="relative mt-4 lg:mt-0 lg:mx-4 ">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <svg className="w-4 h-4 text-gray-600 " viewBox="0 0 24 24" fill="none">
                      <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                  <input type="text" className="w-full py-1 pl-10 pr-4 text-gray-700 placeholder-gray-600 bg-white border-b border-gray-600 dark:placeholder-gray-300 dark:focus:border-gray-300 lg:w-56 lg:border-transparent dark:bg-gray-800  focus:outline-none focus:border-gray-600" placeholder="Search" />
                </div> */}

              </>}
            </div>
            <div className="flex justify-center items-center mt-6 lg:flex lg:mt-0 lg:-mx-2">
              {token && <>
                <Link onClick={() => settoggeld(false)} to='/cart' className="mx-2 text-gray-600 transition-colors duration-300 transform relative  hover:text-gray-500 " aria-label="Reddit">
                  <PiTrolleyFill className='text-2xl' />
                  <span className="absolute -top-2.5 -right-2.5 inline-flex items-center justify-center w-5 h-5 text-xs text-white bg-red-500 rounded-full">
                    {numOfCartItems}
                  </span>
                </Link>
                <Link onClick={() => settoggeld(false)} to='/whishlist' className="mx-2 text-gray-600 transition-colors duration-300 transform  hover:text-gray-500 " aria-label="Facebook">
                  <CiHeart className='text-2xl' />
                </Link>
              </>}
              {!token && <>
                <Link onClick={() => settoggeld(false)} to='/login' className="mx-4 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 ">Login</Link>
                <Link onClick={() => settoggeld(false)} to='/register' className="mx-4 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 ">Register</Link>
              </>}
              {token && <div className='relative'>
                <FaUserCircle onClick={(e) => {
                  setuser(!user)


                }} className=' text-2xl cursor-pointer text-gray-700 hover:text-gray-800 transition-all duration-200' />
                {user &&
                  <div id="userDropdown" className="z-10 absolute top-8 border-2 right-0 bg-white divide-y divide-gray-200 rounded-lg shadow-sm w-44 ">
                    <div className="px-4 py-3 text-sm text-gray-900 ">
                      <p className='text-base font-semibold'>{tokeninfo.name || 'User'}</p>
                    </div>
                    <ul className="py-2 text-sm text-gray-700 " aria-labelledby="avatarButton">
                      <li>
                        <Link to={'/account'} onClick={() => { setuser(!user); settoggeld(false) }} className="block px-4 py-2 hover:bg-gray-100">  Account</Link>
                      </li>
                    </ul>
                    <div className="py-1">
                      <button onClick={() => {
                        settoggeld(false)
                        setuser(false)
                        handleLogout()
                      }} className="block px-4 w-full text-left py-2 text-sm text-gray-700 hover:bg-gray-100">   Sign out</button>
                    </div>
                  </div>
                }
              </div>}
            </div>
          </div>
        </div>
      </div>
    </nav >

  )
}
