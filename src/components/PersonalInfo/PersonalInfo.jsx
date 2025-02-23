import { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContext'
import axios from 'axios';
import Modal from '../Modal/Modal';

export default function PersonalInfo() {
    const { tokeninfo, settokeninfo, token } = useContext(TokenContext)
    const [tokenData, settokenData] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    

    


    async function fetchTokenInfo() {
        const data = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${tokeninfo.id}`)
        settokenData(data.data.data)
        

    }

    useEffect(() => {

        fetchTokenInfo()

    }, [tokeninfo , isOpen])

    return (
        <div className=' container ' >
            <div className='w-full border min-h-96 rounded-md '>
                <div className='flex flex-col gap-4 p-4'>
                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-semibold'>Personal Information</p>
                        <p className='text-sm text-gray-500'>Basic info, like your name and photo</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-semibold'>Name</p>
                        <p className='text-sm text-gray-500'>{tokenData?.name}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-semibold'>Email</p>
                        <p className='text-sm text-gray-500'>{tokenData?.email}</p>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <p className='text-lg font-semibold'>Phone</p>
                        <p className='text-sm text-gray-500'>{tokenData?.phone}</p>
                    </div>
                <button onClick={() => {setIsOpen(!isOpen);} } className='w-28 h-12 rounded-lg transition-all duration-300 hover:bg-green-700 bg-green-600 text-white'>Edit</button>
                </div>

                <Modal isOpen={isOpen} setIsOpen={setIsOpen} tokenData={tokenData} />
            </div>
        </div>
    )
}
