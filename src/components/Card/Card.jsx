import {
    motion,

} from "framer-motion";
import { Link } from "react-router-dom";
import { CgShoppingCart } from "react-icons/cg";
import { FaEye, FaHeart } from "react-icons/fa";
import { useState } from "react";
import QuickViewModal from "../Modal/QuickViewModal";




export default function Card({ product, productItem, addToCartHandler, addToWhishListHandler, isInWhishList, removeFromWhishListHandler }) {


    const [isOpen, setIsOpen] = useState(false)


    return (
        <motion.div
            initial={{ opacity: 0, y: 0 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, bounce: 0.3 }}
            className="group bg-white rounded-xl shadow-md overflow-hidden hover:shadow-2xl transform transition-all duration-300 hover:-translate-y-1"
        >

            <div className="relative overflow-hidden">
                <Link to={`/product/${product._id}`}>

                    <motion.img
                        whileHover={{ scale: 1.9 }}
                        transition={{ duration: 0.6, ease: "easeOut" }}
                        src={product.imageCover}
                        alt={product.title}
                        className="w-full h-64 object-contain"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black bg-opacity-10"
                    />
                </Link>

                {!productItem && <> <motion.button
                    onClick={() => setIsOpen(true)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-4 left-4 p-3 bg-white rounded-full shadow-lg"
                >
                    <FaEye className={` h-5 w-5 text-gray-300  transition-colors duration-300`} />
                </motion.button>
                    <QuickViewModal isOpen={isOpen} setIsOpen={setIsOpen} product={product} />
                </>
                }
                <motion.button
                    onClick={() => {
                        if (isInWhishList) {
                            removeFromWhishListHandler(product._id)
                        } else {
                            addToWhishListHandler(product._id)
                        }
                    }
                    }
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
                >
                    <FaHeart className={`${isInWhishList ? "text-red-500" : ''} h-5 w-5 text-gray-300 hover:text-red-500 transition-colors duration-300`} />
                </motion.button>

            </div>
            <div className="p-5">
                <Link to={`/product/${product._id}`}>

                    <p className="text-gray-800 text-xs">{product.category?.name}</p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-between items-center mb-3"
                    >

                        <h3 className="text-base font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
                            {product.title}
                        </h3>
                        <motion.span
                            whileHover={{ scale: 1.1 }}
                            className="text-xl font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full"
                        >
                            ${product.price}
                        </motion.span>
                    </motion.div>

                </Link>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-green-600 text-white px-4 py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-green-700 transform transition-all duration-300 hover:shadow-lg"
                    onClick={() => {
                        addToCartHandler(product._id)
                    }}
                >
                    <motion.div
                        whileHover={{ rotate: 12 }}
                        transition={{ duration: 0.3 }}
                    >
                        <CgShoppingCart className="h-5 w-5" />
                    </motion.div>
                    <span className="font-medium">Add to Cart</span>
                </motion.button>
            </div>
        </motion.div>
    );

}
