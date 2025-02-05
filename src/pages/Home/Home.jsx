import axios from "axios"
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import Card from "../../components/Card/Card"
import { BsArrowRight } from "react-icons/bs";
import img from '../../assets/hero.avif'
import TextHeader from "../../components/TextHeader/TextHeader";
import Slider from "react-slick";

export default function Home() {

    const [products, setproducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const hasVisited = localStorage.getItem("hasVisited");

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 5,
        slidesToScroll: 5,
        swipeToSlide: true,
        autoplay: true,
        speed: 20000,
        autoplaySpeed: 1000,
        cssEase: "linear"
    };




    const getCategories = async () => {
        await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((response) => {
                console.log(response.data.data)
                setCategories(response.data.data)
            })
            .catch((error) => console.log(error))
    }



    const getProducts = async () => {
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        setproducts(res.data.data)
        console.log(res.data.data)

    }

    useEffect(() => {
        getProducts()
        getCategories()

        if (!hasVisited) {
            localStorage.setItem("hasVisited", true)
            setTimeout(() => {
                setIsLoading(false)
            }, 3500);
        } else {
            setIsLoading(false)
        }


    }, [])



    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-green-100 z-50"
                        initial={{ opacity: 1 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.h1
                            className="text-4xl font-bold"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 1 }}
                        >
                            Modern E-Commerce
                        </motion.h1>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="bg-[#f0f9f0] py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="md:w-1/2 mb-8 md:mb-0"
                        >
                            <TextHeader timer={hasVisited ? 0.5 : 4} />
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="text-lg text-gray-600 mb-6"
                            >
                                Shop eco-friendly products that make a difference. Join us in creating a better tomorrow.
                            </motion.p>
                            <motion.div className="relative">
                                <motion.button
                                    whileHover="hover"
                                    initial="initial"
                                    animate="animate"
                                    className="relative bg-green-600 hover:bg-green-800 transition duration-500 text-white px-8 py-3 rounded-full font-medium overflow-hidden group"
                                >
                                    <motion.div
                                        className="absolute inset-0 bg-green-700"
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileHover={{ scale: 1, opacity: 1 }}
                                        transition={{ duration: 0.9 }}
                                    />
                                    <motion.div className="relative z-10 flex items-center">
                                        <span>Shop Now</span>
                                        <motion.div
                                            className="ml-2"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: [0, 5, 0] }}
                                            transition={{
                                                duration: 1,
                                                repeat: Infinity,
                                                repeatType: "loop",
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <BsArrowRight className="h-5 w-5" />
                                        </motion.div>
                                    </motion.div>
                                    <motion.div
                                        className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0"
                                        initial={{ x: "-100%" }}
                                        whileHover={{ x: "100%" }}
                                        transition={{ duration: 0.6, ease: "easeInOut" }}
                                    />
                                </motion.button>
                                <motion.div
                                    className="absolute inset-0 -z-10 bg-green-400  rounded-full blur-lg"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    whileHover={{ opacity: 0.4, scale: 1.2 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </motion.div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="md:w-1/2"
                        >
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={img}
                                alt="Eco-friendly shopping"
                                className="rounded-lg shadow-xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>

            <div>
                <h3 className="text-3xl font-bold text-center text-gray-800 mt-16 mb-8">Our popular Categories</h3>
            </div>
            <Slider className="mt-12 mb-24 overflow-hidden" {...settings}>
                {
                    categories.map((category) => {
                        return <div key={category.id} className="bg-white rounded-lg shadow-md ">
                            <img src={category.image} className="w-full h-64" alt="" />
                            <p>{category.name}</p>
                        </div>
                    })
                }
            </Slider>
            <div className="container">


                <div>
                    <h3 className="text-3xl font-bold text-center text-gray-800 mt-16 mb-4">Our Products</h3>
                    <p className="text-center text-gray-600 mb-16">Every thing you need you will find it here.</p>
                </div>
                <div className='flex flex-wrap justify-center items-center'>
                    {products.map((product) => {
                        return (
                            <div key={product.id} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 ">
                                <Card product={product} />
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    )
}


{/* <div key={product.id} className="w-1/4 max-w-sm p-5 ">
<div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img className="p-8 rounded-t-lg" src={product.imageCover} alt="product image" />
    </a>
    <div className="px-5 pb-5">
        <a href="#">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">Apple Watch Series 7 GPS, Aluminium Case, Starlight Sport</h5>
        </a>
        <div className="flex items-center mt-2.5 mb-5">
            <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
                <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                    <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                </svg>
            </div>
            <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-green-200 dark:text-green-800 ms-3">5.0</span>
        </div>
        <div className="flex items-center justify-between">
            <span className="text-3xl font-bold text-gray-900 dark:text-white">$599</span>
            <a href="#" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</a>
        </div>
    </div>
</div>
</div> */}

