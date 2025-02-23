import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
import Loader from "../../components/Loader/Loader"
import Card from "../../components/Card/Card"
import { WhishListContext } from "../../Context/WhishListContext"

export default function WhishList() {

    const [loader, setloader] = useState(false)

    const { addToCart, setNumOfCartItems } = useContext(CartContext)
    const [whishList, setWhishList] = useState([])
    const { addToWhishList, getWhishList, removeFromWhishList } = useContext(WhishListContext)


    function isInWhishList(id) {
        let found = whishList?.find((product) => product.id == id)
        if (found) {
            return true
        }
        return false

    }
    async function getWhishListHandler() {
        setloader(true)
        const res = await getWhishList()
        setWhishList(res.data)
        


        setloader(false)
    }

    async function addToWhishListHandler(id) {
        setloader(true)
        const res = await addToWhishList(id)
        if (res.status === 'success') {
            toast.success('Product added to wishlist successfully', { duration: 3500 })
            await getWhishListHandler()
        } else {
            toast.error('Something went wrong', { duration: 3500 })
        }
        setloader(false)
    }


    async function removeFromWhishListHandler(id) {
        setloader(true)
        const res = await removeFromWhishList(id)
        if (res.status === 'success') {
            toast.success('Product removed from wishlist successfully', { duration: 3500 })
            await getWhishListHandler()
        } else {
            toast.error('Something went wrong', { duration: 3500 })
        }
        setloader(false)
    }







    async function addToCartHandler(id) {
        let res = await addToCart(id)
        
        setNumOfCartItems(res.numOfCartItems)
        if (res.status === 'success') {
            toast.success('Product added to cart successfully', { duration: 3500 })
        } else {
            toast.error('Something went wrong', { duration: 3500 })
        }
    }

    useEffect(() => {
        getWhishListHandler()
        window.scrollTo(0, 0)

    }, [])



    return (
        <>
            {loader && <Loader />}
            <div className="container py-14">
                <div className=" mb-10">
                    <h1 className="text-4xl text-center font-bold text-gray-800">Your favourit products ❤</h1>
                </div>
                <div className='flex flex-wrap justify-center items-center'>
                    {whishList?.map((product) => {
                        return (
                            <div key={product.id} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/5  p-2 ">
                                <Card product={product} productItem={false} removeFromWhishListHandler={removeFromWhishListHandler} isInWhishList={isInWhishList(product.id)} addToWhishListHandler={addToWhishListHandler} addToCartHandler={addToCartHandler} />
                            </div>
                        )
                    })}
                </div>
            </div>

        </>
    )
}
