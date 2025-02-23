import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import toast from "react-hot-toast";
import { CartContext } from "../../Context/CartContext";
import { WhishListContext } from "../../Context/WhishListContext";
import Card from "../../components/Card/Card";
import Loader from "../../components/Loader/Loader";
import './ProductItem.css'

export default function ProductItem() {

    const { addToWhishList, removeFromWhishList, getWhishList } = useContext(WhishListContext)
    const [loader, setloader] = useState(false)
    const [products, setProducts] = useState([])
    const [whishList, setWhishList] = useState([])





    const { id } = useParams()
    const [product, setProduct] = useState({});
    const { addToCart, setNumOfCartItems } = useContext(CartContext)
    const [open, setopen] = useState(false)
    


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


    async function getProduct() {
        await axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((response) => {
                setProduct(response.data.data)
            })
            .catch((err) => console.log(err))
    }


    async function getSimilarProducts() {
        await axios.get(`https://ecommerce.routemisr.com/api/v1/products?category=${product?.category?._id}`)
            .then((res) => {
                setProducts(res.data.data)
                
            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getProduct()
        getWhishListHandler()
        window.scrollTo(0, 0)

    }, [id])

    useEffect(() => {
        getSimilarProducts()
    }, [product])

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    };

    const settings2 = {
        dots: false,
        infinite: true,
        arrows: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 5,
        initialSlide: 0,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    return (
        <>
        {loader && <Loader />}
            <div className="max-w-6xl mx-auto p-8  my-6 flex flex-col md:flex-row gap-8 bg-gray-100 text-gray-900 rounded-xl shadow-xl">
                <div className="w-full md:w-1/2">
                    <Slider {...settings}>
                        {product.images && product.images.length > 0 ? (
                            product.images.map((img, index) => (
                                <img
                                    key={index}
                                    src={img}
                                    alt="Product"
                                    className="rounded-xl w-full h-[37rem] object-contain shadow-lg border border-gray-300"
                                />
                            ))
                        ) : (
                            <p className="text-gray-500 text-center"></p>
                        )}
                    </Slider>
                </div>

                <div className="w-full md:w-1/2 p-6 bg-white border border-gray-300 rounded-xl shadow-md space-y-6">
                    <h2 className="text-4xl font-extrabold text-green-600">{product.title}</h2>
                    {/* <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p> */}

                    <div id="accordion-collapse" onClick={() => setopen(!open)} data-accordion="collapse">
                        <h2 id="accordion-collapse-heading-1">
                            <button type="button" className="flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border border-gray-200 rounded-t-xl dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3 transition duration-300" data-accordion-target="#accordion-collapse-body-1" aria-expanded="true" aria-controls="accordion-collapse-body-1">
                                <span>Description</span>
                                <svg data-accordion-icon className="w-3 h-3 rotate-180 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5 5 1 1 5" />
                                </svg>
                            </button>
                        </h2>
                        <div id="accordion-collapse-body-1" className={`${!open ? "max-h-0  top-0 " : 'max-h-96'} transition-all overflow-hidden duration-500`} aria-labelledby="accordion-collapse-heading-1">
                            <div className="p-5 border  border-gray-200 dark:border-gray-700 dark:bg-gray-900">
                                <p className="mb-2 text-gray-500 dark:text-gray-400">{product.description}</p>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <span className="flex items-center text-yellow-400 text-xl">
                            {Array.from({ length: 5 }, (_, i) => (
                                <span key={i} className={i < product.ratingsAverage ? "text-yellow-400" : "text-gray-300"}>★</span>
                            ))}
                        </span>
                        <span className="text-gray-600 text-lg">({product.reviews} reviews)</span>
                    </div>
                    <p className="text-base text-gray-700">Category: {product.category?.name}</p>
                    <p className="text-base text-gray-700">Brand: {product.brand?.name}</p>
                    <p className="text-base text-gray-700">Sold: {product.sold}</p>

                    {(product.priceAfterDiscount == null) && <p className="text-3xl  font-bold text-green-600">{product.price} {' '}EGP</p>}
                    {(product.priceAfterDiscount != null) &&
                        <div className="flex items-baseline gap-2">
                            <p className="text-5xl font-bold text-green-600">{product.priceAfterDiscount}{' '} EGP</p>
                            <p className="text-xl line-through font-bold text-red-400">{product.price}{' '} EGP</p>
                        </div>
                    }



                    <div className="flex justify-center space-x-4 items-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.90 }}
                            className="w-1/2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg shadow-md transition-all duration-300"
                            onClick={() => {
                                addToCartHandler(id)
                            }}
                        >
                            Add to Cart
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.85 }} onClick={() => { addToWhishListHandler(id) }} className="w-1/2 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-4 rounded-lg transition-all duration-200">
                            Wishlist
                        </motion.button>
                    </div>
                </div>
            </div >
            <div className="container px-10 my-10">
                <h2 className="text-4xl font-extrabold text-green-600 text-center mb-10">Similar Products</h2>
                <Slider {...settings2}>
                    {
                        products.map((product) => {
                            return (
                                <div key={product.id} className="  p-2 ">
                                    <Card product={product} productItem={true} removeFromWhishListHandler={removeFromWhishListHandler} isInWhishList={isInWhishList(product.id)} addToWhishListHandler={addToWhishListHandler} addToCartHandler={addToCartHandler} />
                                </div>
                            )
                        })
                    }
                </Slider>
            </div>
        </>
    );
}
