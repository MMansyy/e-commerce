import { useContext, useEffect, useState } from 'react'
import PasswordModal from '../Modal/PasswordModal';

export default function Privacy() {
    const [isOpenPass, setIsOpenPass] = useState(false)




    return (
        <div className=' container ' >
            <div className='w-full border min-h-96 rounded-md '>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-semibold'>Privacy Information</p>
                        <p className='text-sm text-gray-500'>Your Password Information</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-semibold'>Current Password</p>
                        <p className='text-sm text-gray-500'>***********</p>
                    </div>
                    <button onClick={() => { setIsOpenPass(!isOpenPass) }} className='w-28 h-12 rounded-lg transition-all duration-300 hover:bg-green-700 bg-green-600 text-white'>Edit</button>
                </div>

                <PasswordModal isOpenPass={isOpenPass} setIsOpenPass={setIsOpenPass} />
            </div>
        </div>
    )
}
