import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import Card from "../../components/Card/Card"
import { CartContext } from "../../Context/CartContext"
import { WhishListContext } from "../../Context/WhishListContext"
import toast from "react-hot-toast"
import Loader from "../../components/Loader/Loader"


export default function Category() {


    const { id } = useParams()
    const [products, setproducts] = useState([])
    const [loader, setloader] = useState(false)
    const [category, setcategory] = useState({})
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

    async function addToCartHandler(id) {
        let res = await addToCart(id)
        
        setNumOfCartItems(res.numOfCartItems)
        if (res.status === 'success') {
            toast.success('Product added to cart successfully', { duration: 3500 })
        } else {
            toast.error('Something went wrong', { duration: 3500 })
        }
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



    async function getCategory() {
        setloader(true)
        await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}`)
            .then((res) => {
                setcategory(res.data.data)
                
                setloader(false)
            })
            .catch((err) => console.log(err))
    }


    async function getProductByCategory() {
        setloader(true)
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${id}`)
            .then((res) => {
                setproducts(res.data.data)
                
                setloader(false)
            })
            .catch((err) => console.log(err))

    }

    useEffect(() => {
        getCategory()
        getWhishListHandler()
        getProductByCategory()
        window.scrollTo(0, 0)

    }, [])


    return (<>
        {loader && <Loader />}
        <div className='container'>
            <div>
                <h1 className='text-3xl font-bold text-center my-12'>
                    {category.name} Products
                    {
                        products.length === 0 && <p className='text-center mt-8 text-red-500'>Oops! No Products Found <br /> in this category</p>
                    }
                </h1>
            </div>

            <div className='flex flex-wrap justify-center items-center'>
                {products?.map((product) => {
                    return (
                        <div key={product.id} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/5  p-2 mb-8">
                            <Card product={product} removeFromWhishListHandler={removeFromWhishListHandler} isInWhishList={isInWhishList(product.id)} addToWhishListHandler={addToWhishListHandler} addToCartHandler={addToCartHandler} />
                        </div>
                    )
                })}
            </div>
        </div>
    </>
    )
}
