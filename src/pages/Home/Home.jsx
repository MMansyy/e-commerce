import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AnimatePresence, motion } from 'framer-motion';
import Card from "../../components/Card/Card"
import img from '../../assets/hero.webp'
import TextHeader from "../../components/TextHeader/TextHeader";
import img2 from '../../assets/cart.webp'
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import LogoCloud from "../../components/LogoCloud/LogoCloud";
import { Link } from "react-router-dom";
import { WhishListContext } from "../../Context/WhishListContext";

export default function Home() {

    const [products, setproducts] = useState([])
    const [categories, setCategories] = useState([])
    const [isLoading, setIsLoading] = useState(true);
    const [loader, setloader] = useState(false)
    const hasVisited = localStorage.getItem("hasVisited");
    const { addToCart, setNumOfCartItems } = useContext(CartContext)
    const [whishList, setWhishList] = useState([])
    const { addToWhishList, removeFromWhishList, getWhishList } = useContext(WhishListContext)


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




    async function addToCartHandler(id) {
        setloader(true)
        let res = await addToCart(id)

        setNumOfCartItems(res.numOfCartItems)
        if (res.status === 'success') {
            toast.success('Product added to cart successfully', { duration: 3500 })
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




    const getCategories = async () => {
        setloader(true)
        await axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then((response) => {

                setCategories(response.data.data)
            })
            .catch((err) => console.log(err))

        setloader(false)

    }



    const getProducts = async () => {
        setloader(true)
        let res = await axios.get('https://ecommerce.routemisr.com/api/v1/products')
        let shuffeld = res.data.data.sort(() => Math.random() - 0.5).slice(0, 10)
        setproducts(shuffeld)

        setloader(false)

    }

    useEffect(() => {
        getProducts()
        getCategories()
        getWhishListHandler()

        if (!hasVisited) {
            localStorage.setItem("hasVisited", true)
            setTimeout(() => {
                setIsLoading(false)
            }, 2000);
        } else {
            setTimeout(() => {
                setIsLoading(false)
            }, 750);
        }

        window.scrollTo(0, 0)


    }, [])



    return (
        <>

            <AnimatePresence>

                {isLoading && <motion.div
                    className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-green-100 z-50"
                    initial={{ opacity: 1 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1 }}
                >
                    <motion.h1
                        className="text-4xl text-center font-bold"
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        Modern E-Commerce
                    </motion.h1>
                </motion.div>}

            </AnimatePresence>
            <div className="bg-green-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-col md:flex-row items-center justify-between">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="md:w-1/2 mb-8 md:mb-0"
                        >
                            <TextHeader timer={hasVisited ? 1.17 : 3} />
                            <motion.p
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.9 }}
                                className="text-lg pr-3 mt-3 text-gray-600 mb-6"
                            >
                                Us which over of signs divide dominion deep fill bring they're meat beho upon own earth without morning over third. Their male dry. They are great appear whose land fly grass.
                            </motion.p>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="md:w-1/2 md:h-full "
                        >
                            <motion.img
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.3 }}
                                src={img}
                                alt="Eco-friendly shopping"
                                className="rounded-lg  shadow-xl"
                            />
                        </motion.div>
                    </div>
                </div>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-center text-gray-800 mt-16">Our popular Brands</h3>
            </div>

            <LogoCloud />

            <div className="relative w-full h-96 flex items-center justify-center text-white bg-cover bg-center" style={{ backgroundImage: `url(${img})` }}>
                {/* Background Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: `url(${img2})` }}
                />

                {/* Black Overlay */}
                <div className="absolute inset-0 bg-black opacity-50" />

                {/* Content (Text, Button, etc.) */}
                <div className="relative z-10 flex flex-col items-center justify-center text-white text-center p-10">
                    <h2 className="text-5xl font-bold">Up to 50% Off</h2>
                    <p className="text-xl mt-2">Winter Sale</p>
                    <Link to={'/products'} className="cursor-pointer rounded-lg mt-10 font-semibold overflow-hidden relative z-100 border border-green-500 group px-8 py-2">
                        <span className="relative z-10  group-hover:text-white text-xl duration-500">Shop now</span>
                        <span className="absolute w-full h-full bg-green-500 -left-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:left-0 duration-500" />
                        <span className="absolute w-full h-full bg-green-500 -right-32 top-0 -rotate-45 group-hover:rotate-0 group-hover:right-0 duration-500" />
                    </Link>

                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                className="container flex items-center justify-center flex-col">
                <div>
                    <h3 className="text-3xl font-extrabold text-center text-gray-800 mt-16 mb-4">Our Popular Products</h3>
                    <p className="text-center text-gray-600 mb-16">Every thing you need you will find it here.</p>
                </div>
                <div className='flex flex-wrap justify-center items-center'>
                    {products.map((product) => {
                        return (
                            <div key={product.id} className=" w-full sm:w-1/2 md:w-1/3 lg:w-1/5 p-2 ">
                                <Card product={product} productItem={false} isInWhishList={isInWhishList(product.id)} addToWhishListHandler={addToWhishListHandler} addToCartHandler={addToCartHandler} removeFromWhishListHandler={removeFromWhishListHandler} />
                            </div>
                        )
                    })}
                </div>
                <Link to={'/products'} className="w-full flex justify-center">
                    <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-2/6 mt-10 bg-green-600 text-white px-4 py-3 rounded-lg gap-2 hover:bg-green-700 transform transition-all duration-300 hover:shadow-lg"
                    >
                        <span className="font-medium">Load More</span>
                    </motion.button>
                </Link>
            </motion.div>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                className="bg-green-50 font-[sans-serif] p-28 mt-16">
                <div className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-gray-800 text-4xl font-extrabold">Newsletter</h3>
                    <p className="text-gray-500 text-sm mt-6">Subscribe to our newsletter and stay up to date with the latest news,
                        updates, and exclusive offers. Get valuable insights. Join our community today!</p>
                    <div className="w-72 md:w-3/6 bg-gray-100 flex p-1 rounded-full text-left border focus-within:border-green-600 focus-within:bg-transparent mt-12">
                        <input type="email" placeholder="Enter your email" className="text-gray-800 w-full outline-none bg-transparent text-sm px-4 py-3" />
                        <button type="button" className="bg-green-600 hover:bg-green-700 transition-all text-white font-semibold text-sm rounded-full px-6 py-3">Submit</button>
                    </div>
                </div>
            </motion.div>

            <motion.div className="font-[sans-serif] p-12 md:p-24 bg-white "
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                viewport={{ once: true, amount: 0.1 }}
            >
                <div className="max-w-6xl mx-auto relative bg-white shadow-xl rounded-3xl overflow-hidden">
                    <div className="absolute -bottom-6 -left-6 w-20 h-20 rounded-full bg-green-400" />
                    <div className="absolute -top-6 -right-6 w-20 h-20 rounded-full bg-green-400" />
                    <div className="grid md:grid-cols-2 gap-8 py-8 px-6">
                        <div className="text-center flex flex-col items-center justify-center">
                            <img src="https://readymadeui.com/signin-image.webp" className="shrink-0 aspect-[250/196] object-contain" />
                        </div>
                        <form className="rounded-tl-3xl rounded-bl-3xl max-md:-order-1">
                            <h2 className="text-2xl text-green-600 font-bold text-center mb-6">Contact us</h2>
                            <div className="max-w-md mx-auto space-y-3 relative">
                                <input type="text" placeholder="Name" className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-none border border-gray-100 focus:border-green-600 focus:bg-transparent transition-all" />
                                <input type="email" placeholder="Email" className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-none border border-gray-100 focus:border-green-600 focus:bg-transparent transition-all" />
                                <input type="email" placeholder="Phone No." className="w-full bg-gray-100 rounded-md py-3 px-4 text-sm outline-none border border-gray-100 focus:border-green-600 focus:bg-transparent transition-all" />
                                <textarea placeholder="Message" rows={6} className="w-full bg-gray-100 rounded-md px-4 text-sm pt-3 outline-none border border-gray-100 focus:border-green-600 focus:bg-transparent transition-all" defaultValue={""} />
                                <button type="button" className="text-white w-full relative bg-green-500 hover:bg-green-600 rounded-md text-sm px-6 py-3 !mt-6">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px" fill="#fff" className="mr-2 inline" viewBox="0 0 548.244 548.244">
                                        <path fillRule="evenodd" d="M392.19 156.054 211.268 281.667 22.032 218.58C8.823 214.168-.076 201.775 0 187.852c.077-13.923 9.078-26.24 22.338-30.498L506.15 1.549c11.5-3.697 24.123-.663 32.666 7.88 8.542 8.543 11.577 21.165 7.879 32.666L390.89 525.906c-4.258 13.26-16.575 22.261-30.498 22.338-13.923.076-26.316-8.823-30.728-22.032l-63.393-190.153z" clipRule="evenodd" data-original="#000000" />
                                    </svg>
                                    Send Message
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </motion.div>
            {loader && !isLoading && <Loader />}
        </>
    )
}



