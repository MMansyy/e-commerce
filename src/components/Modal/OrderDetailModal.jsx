import { AnimatePresence, motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";


export default function OrderDetailModal({ isOpen, setIsOpen, products }) {

    



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
                        className="bg-white  text-white p-8 rounded-lg w-full shadow-xl cursor-default relative overflow-hidden"
                    >
                        <motion.button
                            onClick={() => setIsOpen(false)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
                        >
                            <FaTimes className={` h-5 w-5 text-gray-300  transition-colors duration-300`} />
                        </motion.button>

                        <div className='container'>
                            <div className='w-full border min-h-96 max-h-96 overflow-y-scroll rounded-md '>
                                <div className="overflow-x-auto w-full">
                                    <table className="min-w-full table-fixed divide-y-2 divide-gray-200 bg-white text-sm">
                                        <thead className="text-left">
                                            <tr>
                                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Product Image</th>
                                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Product Title</th>
                                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Product Category</th>
                                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Product Count</th>
                                                <th className="px-4 py-2 font-medium whitespace-nowrap text-gray-900">Product Price</th>
                                            </tr>
                                        </thead>

                                        <tbody className="divide-y divide-gray-200">
                                            {products?.map((product) => (
                                                <tr key={product.product?.id}>
                                                    <td className="px-4 py-2 text-left whitespace-nowrap w-32 h-32 rounded-full"><img src={product.product?.imageCover} alt="" /></td>
                                                    <td className="px-4 py-2 text-left whitespace-nowrap text-gray-900">{product.product?.title}</td>
                                                    <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">{product.product?.category?.name}</td>
                                                    <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">{product.count}</td>
                                                    <td className="px-4 py-2 text-left whitespace-nowrap text-gray-700">${product.price}</td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
