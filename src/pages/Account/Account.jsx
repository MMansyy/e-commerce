import { CiDeliveryTruck } from 'react-icons/ci'
import { FaRegUser } from 'react-icons/fa'
import { MdOutlinePrivacyTip } from 'react-icons/md'
import { Link, Outlet } from 'react-router-dom'

export default function Account() {

    return (
        <div className='container '>
            <div className="flex flex-wrap md:flex-nowrap justify-center items-center">
                <div className='min-w-[1/5]  md:h-96 border my-5 p-3 rounded-md  '>
                    <ul className='text-lg'>
                        <Link to={''} >
                            <li className='flex gap-2 items-center border-b  rounded transition-all duration-200 bg-transparent hover:bg-gray-100 p-2'>
                                <FaRegUser className='' />
                                <p>Personal information</p>
                            </li>
                        </Link>
                        <Link to={'privacy'} >
                            <li className='flex gap-2 items-center border-b  rounded transition-all duration-200 bg-transparent hover:bg-gray-100 p-2'>
                                <MdOutlinePrivacyTip />
                                <p>Privacy</p>
                            </li>
                        </Link>
                        <Link to={'allorders'} >
                            <li className='flex gap-2 items-center border-b  rounded transition-all duration-200 bg-transparent hover:bg-gray-100 p-2'>
                                <CiDeliveryTruck />
                                <p>Orders</p>
                            </li>
                        </Link>
                    </ul>
                </div>
                <div className='w-4/5 mb-5'>
                    <Outlet />
                </div>

            </div>
        </div>
    )
}


{/* <div className='flex flex-col gap-4 '>
                        <div className='w-16 h-16 rounded-md group cursor-pointer hover:bg-green-300 transition-all duration-200 bg-green-200 flex flex-col justify-center items-center '>
                            <MdOutlineManageAccounts className='text-3xl p-1 rounded-full transition-all duration-200 group-hover:bg-green-400 bg-green-300' />
                            <p className='text-xs'>Account</p>
                        </div>
                        <div className='w-16 h-16 rounded-md group cursor-pointer hover:bg-blue-300 transition-all duration-200 bg-blue-200 flex flex-col justify-center items-center '>
                            <MdOutlineManageAccounts className='text-3xl p-1 rounded-full transition-all duration-200 group-hover:bg-blue-400 bg-blue-300' />
                            <p className='text-xs'>Privacy</p>
                        </div>
                        <div className='w-16 h-16 rounded-md group cursor-pointer hover:bg-rose-300 transition-all duration-200 bg-rose-200 flex flex-col justify-center items-center '>
                            <MdOutlineManageAccounts className='text-3xl p-1 rounded-full transition-all duration-200 group-hover:bg-rose-400 bg-rose-300' />
                            <p className='text-xs'>Orders</p>
                        </div>
                       
                    </div> */}
