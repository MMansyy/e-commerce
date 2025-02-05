import 'animate.css';
import axios from 'axios';
import { useFormik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Loader from '../../components/Loader/Loader';


export default function Register() {



  const [isLoading, setisLoading] = useState(false)
  const [ErrMsg, setErrMsg] = useState(null)
  const navigate = useNavigate()
  // const [isLoading, setisLoading] = useState(false)

  async function handleRegister(values) {
    setisLoading(true)
    const data = axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup', values)
      .then((res) => navigate('/login'))
      .catch((err) => setErrMsg(err.response.data.message))
      .finally(() => setisLoading(false))
  }

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().required('Password is required'),
    rePassword: Yup.string().required('RePassword is required').oneOf([Yup.ref('password')], 'Passwords must match'),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number').required('Phone number is required')
  })

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: ''
    },
    validationSchema,
    onSubmit: handleRegister
  })

  // formik.isValid = formik.dirty && formik.isValid

  return (
    <div className='flex p-10 items-center justify-center'>
      {isLoading && <Loader />}
      <div className='rounded-lg max-w-4xl mx-auto w-full'>
        <div>
          <h1 className="text-3xl mb-6 font-semibold dark:text-white">Register Now</h1>
        </div>
        <form onSubmit={formik.handleSubmit}>
          {ErrMsg && <p className='text-red-500'>{ErrMsg}</p>}
          <div className="relative z-0 w-full mb-5 group ">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
            {(formik.errors.name && formik.touched.name) ? <p className='text-red-500'>{formik.errors.name}</p> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} type="email" name="email" id="email" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="email" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email address</label>
            {(formik.errors.email && formik.touched.email) ? <p className='text-red-500'>{formik.errors.email}</p> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group  ">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="password" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
            {(formik.errors.password && formik.touched.password) ? <p className='text-red-500'>{formik.errors.password}</p> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="rePassword" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm password</label>
            {(formik.errors.rePassword && formik.touched.rePassword) ? <p className='text-red-500'>{formik.errors.rePassword}</p> : null}
          </div>
          <div className="relative z-0 w-full mb-5 group ">
            <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="phone" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
            <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone number (123-456-7890)</label>
            {(formik.errors.phone && formik.touched.phone) ? <p className='text-red-500'>{formik.errors.phone}</p> : null}
          </div>
          <button type="submit" disabled={!formik.isValid || !formik.dirty} className={`animate__animated animate__bounceInUp text-white bg-green-600 ${formik.isValid && "hover:bg-green-700"} transition-all duration-300 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-base w-full sm:w-auto px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800 ${(!formik.isValid || !formik.dirty) && "bg-opacity-50 cursor-not-allowed"} `}>Submit</button>
        </form >
      </div>
    </div>
  )
}


