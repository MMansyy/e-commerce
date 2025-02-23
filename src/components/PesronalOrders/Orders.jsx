import React, { useContext, useEffect, useState } from 'react'
import { TokenContext } from '../../Context/TokenContext'
import axios from 'axios'
import OrderDetailModal from '../Modal/OrderDetailModal'

export default function Orders() {
    const { tokeninfo } = useContext(TokenContext)
    const [orders, setorders] = useState([])
    const [isOpen, setIsOpen] = useState(false)
    const [x, setx] = useState(0)
    async function getOrders() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${tokeninfo.id}`)
            .then(res => {
                
                setorders(res.data)
            })
            .catch(err => {
                
            })
    }

    useEffect(() => {
        getOrders()
    }, [tokeninfo])

    return (
        <div className='container'>
            <div className='w-full border max-h-96 overflow-y-auto rounded-md '>
                <div className="overflow-x-auto w-full">
                    <table className="min-w-full table-fixed divide-y-2 divide-gray-200 bg-white text-sm">
                        <thead className="text-left">
                            <tr>
                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Order ID</th>
                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Created at</th>
                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Type</th>
                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Order Total</th>
                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Delivered</th>
                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Details</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-200">
                            {orders?.map((order, index) => (
                                <>
                                    <tr key={order.id}>
                                        <td className="px-4 py-2 text-left whitespace-nowrap text-gray-900">{order.id}</td>
                                        <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">{order.createdAt.split('T')[0]}</td>
                                        <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">{order.paymentMethodType}</td>
                                        <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">${order.totalOrderPrice}</td>
                                        <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">{order.isDelivered ? <span className='rounded-2xl text-green-800 bg-green-200 p-1'>Deliverd</span> : <span className='rounded-2xl text-xs text-red-800 bg-red-200 p-2'>Arriving soon</span>}</td>
                                        <td className="px-4 py-2 whitespace-nowrap">
                                            <button onClick={() => {
                                                setx(index);
                                                setIsOpen(true)
                                            }} className="inline-block rounded-sm bg-green-600 transition-all duration-300 px-4 py-2 text-xs font-medium text-white hover:bg-green-800">
                                                View
                                            </button>
                                        </td>
                                    </tr>
                                </>
                            ))}
                            <OrderDetailModal isOpen={isOpen} setIsOpen={setIsOpen} products={orders[x]?.cartItems} />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}


