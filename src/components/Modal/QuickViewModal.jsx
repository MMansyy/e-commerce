import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { FaTimes } from "react-icons/fa";
import Slider from "react-slick";


export default function QuickViewModal({ isOpen, setIsOpen, product }) {

    const [open, setopen] = useState(false)

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000
    };


    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsOpen(false)}
                    className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-50 flex justify-center items-center overflow-y-scroll "
                >
                    <motion.div
                        initial={{ scale: 0, rotate: "12.5deg" }}
                        animate={{ scale: 1, rotate: "0deg" }}
                        exit={{ scale: 0, rotate: "0deg" }}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-white  text-white p-8 rounded-lg w-full max-w-3xl shadow-xl cursor-default relative overflow-hidden"
                    >
                        <motion.button
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
                        >
                            <FaTimes className={` h-5 w-5 text-gray-300  transition-colors duration-300`} />
                        </motion.button>
                        <div className="flex flex-wrap md:flex-nowrap items-center gap-4">
                            <Slider className="w-52 md:w-64" {...settings}>
                                {product.images && product.images.length > 0 ? (
                                    product.images.map((img, index) => (
                                        <img
                                            key={index}
                                            src={img}
                                            alt="Product"
                                            className=" object-contain shadow-lg"
                                        />
                                    ))
                                ) : (
                                    <p className="text-gray-500 text-center"></p>
                                )}
                            </Slider>
                            <div className="flex flex-wrap flex-col gap-4">
                                <h2 className="text-xl font-bold text-gray-800">{product.title}</h2>
                                {/* <p className="text-gray-500">{product.description}</p> */}
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

                                <p className="text-base text-gray-700">Category: {product.category?.name}</p>
                                <p className="text-base text-gray-700">Brand: {product.brand?.name}</p>
                                <p className="text-base text-gray-700">Sold: {product.sold}</p>
                                {(product.priceAfterDiscount == null) && <p className="text-2xl  font-bold text-green-600">{product.price} {' '}EGP</p>}
                                {(product.priceAfterDiscount != null) &&
                                    <div className="flex items-baseline gap-2">
                                        <p className="text-xl font-bold text-green-600">{product.priceAfterDiscount}{' '} EGP</p>
                                        <p className=" line-through font-bold text-red-400">{product.price}{' '} EGP</p>
                                    </div>
                                }
                            </div>
                        </div>



                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
