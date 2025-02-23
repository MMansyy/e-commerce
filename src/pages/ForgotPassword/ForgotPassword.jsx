import axios from "axios";
import { useFormik } from "formik";
import { useContext, useRef, useState } from "react"
import { MdDone } from "react-icons/md";
import * as Yup from 'yup'
import OtpInput from 'react-otp-input';
import toast from "react-hot-toast";
import { TokenContext } from "../../Context/TokenContext";
import { useNavigate } from "react-router-dom";



export default function ForgotPassword() {
    const [step, setstep] = useState(1)
    const [errMsg, setErrMsg] = useState('')
    const [otp, setOtp] = useState('')
    const { setToken} = useContext(TokenContext)
    const navigate = useNavigate()
    

    let Email = useRef('')
    const initialValues = {
        email: ''
    }

    const validationSchema = Yup.object({
        email: Yup.string().email('Invalid email').required('Email is required')
    })

    async function handleOtp() {
        await axios.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode', { resetCode: otp })
            .then(res => {
                if (res.data.status === "Success") {
                    toast.success('Code verified successfully')
                    setstep(3)
                }
            }).catch(err => {
                toast.error(err.response.data.message, { position: 'top-center' })
            })
    }

    async function handleEmail(values) {
        Email.current = values.email
        const res = await axios.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords', values)
        if (res.data.statusMsg === 'success') {
            setstep(2)
        } else if (res.data.statusMsg === 'fail') {
            setErrMsg(res.response.data.message)
            
        }
    }
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: handleEmail
    })

    async function handleResetPassword(values) {
        axios.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword', { email: Email.current, newPassword: values.password })
            .then(res => {
                if (res.data.token) {
                    toast.success('Password reset successfully')
                    localStorage.setItem('token', res.data.token)
                    setToken(res.data.token)
                    

                    navigate('/')
                }
            }).catch(err => {
                toast.error(err.response.data.message, { position: 'top-center' })
            })
    }

    const formik2 = useFormik({
        initialValues: {
            password: ''
        },
        validationSchema: Yup.object({
            password: Yup.string().required('Password is required').min(6, 'Password must be at least 6 characters').max(20, 'Password must be at most 20 characters')
        }),
        onSubmit: handleResetPassword
    })

    return (
        <div className="container">
            <div className="min-h-96 max-w-xl mx-auto my-10 bg-slate-100 p-4 rounded-lg">

                <div className=" flex items-center mb-12 justify-center">
                    <div className="flex items-center w-full">
                        <div className={`w-7 h-7 shrink-0 mx-[-1px] flex items-center justify-center rounded-full ${step >= 1 ? 'bg-green-600' : 'bg-gray-300'}`}>
                            <span className="text-sm text-white font-bold">{step > 1 ? <MdDone /> : 1}</span>
                        </div>
                        <div className={`w-full h-[3px] mx-4 rounded-lg ${step > 1 ? 'bg-green-600' : 'bg-gray-300'}`} />
                    </div>
                    <div className="flex items-center w-full">
                        <div className={`w-7 h-7 shrink-0 mx-[-1px] flex items-center justify-center rounded-full ${step >= 2 ? 'bg-green-600' : 'bg-gray-300'}`}>
                            <span className="text-sm text-white font-bold">{step > 2 ? <MdDone /> : 2}</span>
                        </div>
                        <div className={`w-full h-[3px] mx-4 rounded-lg ${step > 2 ? 'bg-green-600' : 'bg-gray-300'}`} />
                    </div>
                    <div className="flex items-center ">
                        <div className={`w-7 h-7 shrink-0 mx-[-1px] flex items-center justify-center rounded-full ${step >= 3 ? 'bg-green-600' : 'bg-gray-300'}`}>
                            <span className="text-sm text-white font-bold">3</span>
                        </div>
                    </div>
                </div>
                {step === 1 &&
                    <div className="flex flex-col gap-4">
                        <p className="text-lg font-semibold">Forgot your password?</p>
                        <p className="text-sm text-gray-500">Enter your email address and we'll send you a link to reset your password</p>
                        {errMsg && <p className='text-red-500'>{errMsg}</p>}
                        <form onSubmit={formik.handleSubmit} className="flex flex-col gap-2">
                            <label htmlFor="email" className="text-sm font-semibold">Email</label>
                            <input type="email" name="email" id="email" onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className="rounded-lg p-2 mb-2" placeholder="Enter your email" />
                            {(formik.errors.email && formik.touched.email) ? <p className='text-red-500'>{formik.errors.email}</p> : null}
                            <button type='submit' className={`${formik.isSubmitting ? 'bg-opacity-50 cursor-wait ' : 'hover:bg-green-700'} bg-green-600 transition-all duration-300 text-white rounded-lg p-2`}>{formik.isSubmitting ? 'loading' : 'Send'}</button>
                        </form>
                    </div>
                }
                {step === 2 && <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">Check your email</p>
                    <p className="text-sm text-gray-500">We have sent a 6-digit code to your email address</p>
                    <OtpInput
                        inputStyle={{ width: '2rem', height: '2rem', margin: '0 0.5rem', fontSize: '1.5rem', textAlign: 'center', borderRadius: '0.5rem', border: '1px solid #ccc' }}
                        skipDefaultStyles={true}
                        containerStyle={{ display: 'flex', justifyContent: 'center', margin: '2rem 0' }}
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={<span>-</span>}
                        renderInput={(props) => <input {...props} />}
                    />
                    <button onClick={() => { handleOtp() }} disabled={String(otp)?.length != 6} className={`bg-green-600 text-white rounded-lg p-2 ${String(otp)?.length != 6 ? ' cursor-not-allowed bg-opacity-50' : ''}`}>Done</button>
                </div>}
                {step === 3 && <div className="flex flex-col gap-4">
                    <p className="text-lg font-semibold">Password reset</p>
                    <p className="text-sm text-gray-500">Enter your new password</p>
                    <form onSubmit={formik2.handleSubmit} className="flex flex-col gap-2">
                        <label htmlFor="password" className="text-sm font-semibold">Password</label>
                        <input type="password" name="password" id="password" onChange={formik2.handleChange} value={formik2.values.password} onBlur={formik2.handleBlur} className="rounded-lg p-2 mb-2" placeholder="Enter your password" />
                        {(formik2.errors.password && formik2.touched.password) ? <p className='text-red-500'>{formik2.errors.password}</p> : null}
                        <button type="submit" className="bg-green-600 text-white rounded-lg p-2">Set New Password</button>
                    </form>
                </div>}

            </div>
        </div >

    )
}
