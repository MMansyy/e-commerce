import axios from "axios";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import * as Yup from 'yup';
import { TokenContext } from "../../Context/TokenContext";
import toast from "react-hot-toast";


export default function Modal({ isOpen, setIsOpen, tokenData }) {
    const { token } = useContext(TokenContext)
    const [initialValues, setInitialValues] = useState({
        name: '',
        // email: '',
        phone: ''
    })





    useEffect(() => {
        if (tokenData) {
            setInitialValues({
                name: tokenData.name || "",
                phone: tokenData.phone || ""
            });

        }
    }, [tokenData]);




    const validationSchema = Yup.object({
        name: Yup.string().required('Name is required'),
        phone: Yup.string().matches(/^01[0125][0-9]{8}$/, 'Invalid phone number').required('Phone number is required')
    })

    async function handleUpdate(values) {
        await axios.put('https://ecommerce.routemisr.com/api/v1/users/updateMe/', values, {
            headers: { token }
        })
            .then((res) => { setIsOpen(false); toast.success('Updated Successfully') })
            .catch((err) => toast.error(err.response.data.errors.msg))

    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues,
        validationSchema,
        onSubmit: handleUpdate


    })

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll "
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white  text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >

                        <h2 className="text-black p-5 text-xl font-semibold">Update Your Information</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex p-5 flex-wrap items-center gap-2">
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name} type="text" name="name" id="name" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="name" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Name</label>
                                    {(formik.errors.name && formik.touched.name) ? <p className='text-red-500'>{formik.errors.name}</p> : null}
                                </div>
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input disabled  value={tokenData.email} type="email" name="email" id="email" className="block opacity-70 cursor-not-allowed px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="email" className="absolute  text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Email address</label>
                                </div>
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.phone} type="tel" name="phone" id="phone" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-green-500 focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="phone" className="absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white dark:bg-gray-900 px-2 peer-focus:px-2 peer-focus:text-green-600 peer-focus:dark:text-green-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Phone number (123-456-7890)</label>
                                    {(formik.errors.phone && formik.touched.phone) ? <p className='text-red-500'>{formik.errors.phone}</p> : null}
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 p-5">
                                <button type='submit' disabled={!formik.isValid} className='disabled:bg-opacity-50 bg-green-500 text-white px-4 py-2 rounded-lg'>{formik.isSubmitting ? 'loading' : 'Update'}</button>
                            </div>
                        </form>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
