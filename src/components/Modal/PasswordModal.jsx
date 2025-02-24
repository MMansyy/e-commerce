import axios from "axios";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import { useContext } from "react";
import * as Yup from 'yup';
import { TokenContext } from "../../Context/TokenContext";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";


export default function PasswordModal({ isOpenPass, setIsOpenPass }) {
    const { token } = useContext(TokenContext)




    const initialValues = {
        currentPassword: '',
        password: '',
        rePassword: ''
    }




    const validationSchema = Yup.object({
        password: Yup.string().required('Password is required').min(8, 'Password must be at least 8 characters'),
        rePassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Password confirmation')

    })

    async function handlePassword(values) {
        await axios.put('https://ecommerce.routemisr.com/api/v1/users/changeMyPassword', values, {
            headers: { token }
        })
            .then((res) => { setIsOpenPass(false); toast.success('Updated Successfully') })
            .catch((err) => toast.error(err.response.data.errors.msg))

    }

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handlePassword
    })

    return (
        <AnimatePresence>
            {isOpenPass && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpenPass(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 grid place-items-center overflow-y-scroll "
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "20deg" }}
                        animate={{ scale: 1, rotate: "0deg"  }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white  text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
                    >
                        <motion.button
                            onClick={() => setIsOpenPass(false)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
                        >
                            <FaTimes className={` h-5 w-5 text-gray-300  transition-colors duration-300`} />
                        </motion.button>
                        <h2 className="text-black p-5 text-xl font-semibold">Update Your Paswword</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <div className="flex p-5 flex-wrap items-center gap-2">
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.currentPassword} type="password" name="currentPassword" id="currentPassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="currentPassword" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Current Password</label>
                                    {(formik.errors.currentPassword && formik.touched.currentPassword) ? <p className='text-red-500'>{formik.errors.currentPassword}</p> : null}
                                </div>
                                <div className="relative z-0 w-full mb-5 group  ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password} type="password" name="password" id="password" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="password" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Password</label>
                                    {(formik.errors.password && formik.touched.password) ? <p className='text-red-500'>{formik.errors.password}</p> : null}
                                </div>
                                <div className="relative z-0 w-full mb-5 group ">
                                    <input onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.rePassword} type="password" name="rePassword" id="rePassword" className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-900 bg-transparent rounded-lg border-2 border-gray-300 appearance-none   focus:outline-none focus:ring-0 focus:border-green-600 peer" placeholder=" " required />
                                    <label htmlFor="rePassword" className="absolute text-sm text-gray-500  duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white  px-2 peer-focus:px-2 peer-focus:text-green-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1">Confirm password</label>
                                    {(formik.errors.rePassword && formik.touched.rePassword) ? <p className='text-red-500'>{formik.errors.rePassword}</p> : null}
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
