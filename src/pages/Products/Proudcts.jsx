import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/CartContext"
import toast from "react-hot-toast"
import Loader from "../../components/Loader/Loader"
import Card from "../../components/Card/Card"
import FashionSlider from "../../components/MainSlider/MainSlider"
import { WhishListContext } from "../../Context/WhishListContext"

export default function Proudcts() {

    const [loader, setloader] = useState(false)
    const [products, setproducts] = useState([])
    const [filterproducts, setfilterproducts] = useState([])
    const { addToCart, setNumOfCartItems } = useContext(CartContext)
    const [filter, setFilter] = useState("all");
    const [whishList, setWhishList] = useState([])
    const { addToWhishList, getWhishList, removeFromWhishList } = useContext(WhishListContext)


    function isInWhishList(id) {
        let found = whishList?.find((product) => product.id == id)
        if (found) {
            return true
        }
        return false

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

    async function getWhishListHandler() {
        const res = await getWhishList()
        setWhishList(res.data)
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






    async function getProducts() {
        setloader(true)
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        let res2 = await axios.get('https://ecommerce.routemisr.com/api/v1/products?page=2')
        let shuffeld = [...res.data.data, ...res2.data.data]
        setproducts(shuffeld)
        setfilterproducts(shuffeld)
        
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
        getProducts()
        getWhishListHandler()
        window.scrollTo(0, 0)

    }, [])


    function filteriation() {
        let filterd = [...products]
        if (filter == 'all') {
            setfilterproducts(filterd)
            return
        }
        filterd = filterd.filter((product) => product.category?.name == filter)
        
        setfilterproducts(filterd)
    }

    function searchHandler(e) {
        let search = e.target.value
        let filterd = [...products]
        filterd = filterd.filter((product) => product.title.toLowerCase().includes(search.toLowerCase()))
        setfilterproducts(filterd)
        

    }

    useEffect(() => {
        filteriation()
    }, [filter])



    return (
        <>
            {loader && <Loader />}
            <FashionSlider />
            <div className="container py-14">
                <div className="flex flex-col space-y-5 md:flex-row justify-between items-center mb-10">
                    <h2 className="text-4xl font-bold text-gray-800">Products</h2>
                    <input onChange={(e) => { searchHandler(e) }} type="text" placeholder="Search for products" className="border border-gray-300 rounded-md p-2 w-full md:w-1/3" />
                    <div className="flex flex-col ">
                        <label className="text-gray-800 mb-3">Filter By Category</label>
                        <select className="border border-gray-300 rounded-md p-2"
                            onChange={(e) => {
                                setFilter(e.target.value)
                            }}>
                            <option value="all">All</option>
                            <option value="Men's Fashion">Men's Fashion</option>
                            <option value="Women's Fashion">Women's Fashion</option>
                            <option value="Electronics">Electronics</option>
                        </select>
                    </div>
                </div>
                <div className='flex flex-wrap justify-center items-center'>
                    {filterproducts.map((product) => {
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
