import axios from "axios";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useRef } from "react";
import * as Yup from 'yup';
import { TokenContext } from "../../Context/TokenContext";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { useNavigate } from "react-router-dom";


export default function OrderModal({ isOpenOrder, setIsOpenOrder, cartId }) {


    const { token } = useContext(TokenContext)
    const { createCashOrder, createOnlineOrder } = useContext(CartContext)
    const navigate = useNavigate()
    const orderType = useRef('cash')
    






    const initialValues = {
        details: '',
        phone: '',
        city: ''
    }




    const validationSchema = Yup.object({
        details: Yup.string(),
        phone: Yup.string().min(11, 'phone must be at least 6 characters').required('phone is required'),
        city: Yup.string().required('city is required')

    })

    async function handleOrder(values) {
        if (orderType.current === 'cash') {
            let res = await createCashOrder(cartId, values)
            

            if (res.status == 'success') {
                toast.success('Order created successfully')
                navigate('/account/allorders')
                setIsOpenOrder(false)
            } else {
                toast.error('Order failed')
            }
        } else {
            let res = await createOnlineOrder(cartId, values)
            

            if (res.status == 'success') {
                toast.success('Order created successfully')
                setIsOpenOrder(false)
            } else {
                toast.error('Order failed')
            }
        }

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleOrder
    })

    return (
        <AnimatePresence>
            {isOpenOrder && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpenOrder(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll "
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white  text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >

                        <h2 className="text-black p-5 text-xl font-semibold">Shipping Address</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex p-5 flex-wrap items-center gap-2">
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.details} type="phone" name="details" id="details" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="details" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Details</label>
                                    {(formik.errors.details && formik.touched.details) ? <p className='text-red-500'>{formik.errors.details}</p> : null}
                                </div>
                                <div className="relative z-0 w-full mb-5 group  ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="phone" name="phone" id="phone" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">phone</label>
                                    {(formik.errors.phone && formik.touched.phone) ? <p className='text-red-500'>{formik.errors.phone}</p> : null}
                                </div>
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.city} type="phone" name="city" id="city" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="city" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">City</label>
                                    {(formik.errors.city && formik.touched.city) ? <p className='text-red-500'>{formik.errors.city}</p> : null}
                                </div>
                                <div>
                                    <select onChange={(e) => orderType.current = e.target.value} className="w-full p-2 rounded-lg border-2 border-gray-300 text-gray-600" name="orderType" id="orderType">
                                        <option value="cash">Cash</option>
                                        <option value="online">Online</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 p-5">
                                <button type='submit' disabled={!formik.isValid} className='disabled:bg-opacity-50 bg-green-500 text-white px-4 py-2 rounded-lg'>{formik.isSubmitting ? 'loading' : 'Done'}</button>
                            </div>
                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
