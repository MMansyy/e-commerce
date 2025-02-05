import {
    motion,
    useMotionTemplate,
    useMotionValue,
    useSpring,
} from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import CartButton from "../Button/CartButton";
import { CgShoppingCart } from "react-icons/cg";
import { BiHeart } from "react-icons/bi";



// export default function Card(props) {
//     const { product } = props;
//     const ROTATION_RANGE = 32.5;
//     const HALF_ROTATION_RANGE = 32.5 / 2;

//     const ref = useRef(null);

//     const x = useMotionValue(0);
//     const y = useMotionValue(0);

//     const xSpring = useSpring(x);
//     const ySpring = useSpring(y);

//     const transform = useMotionTemplate`rotateX(${xSpring}deg) rotateY(${ySpring}deg)`;

//     const handleMouseMove = (e) => {
//         if (!ref.current) return [0, 0];

//         const rect = ref.current.getBoundingClientRect();

//         const width = rect.width;
//         const height = rect.height;

//         const mouseX = (e.clientX - rect.left) * ROTATION_RANGE;
//         const mouseY = (e.clientY - rect.top) * ROTATION_RANGE;

//         const rX = (mouseY / height - HALF_ROTATION_RANGE) * -1;
//         const rY = mouseX / width - HALF_ROTATION_RANGE;

//         x.set(rX);
//         y.set(rY);
//     };

//     const handleMouseLeave = () => {
//         x.set(0);
//         y.set(0);
//     };

//     return (
//         <motion.div
//             ref={ref}
//             onMouseMove={handleMouseMove}
//             onMouseLeave={handleMouseLeave}
//             style={{
//                 transformStyle: "preserve-3d",
//                 transform,
//             }}
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ duration: 1 }}
//             className="relative h-[31rem] w-72 rounded-xl"
//         >
//             <div
//                 style={{
//                     transform: "translateZ(75px)",
//                     transformStyle: "preserve-3d",
//                 }}
//                 className="absolute inset-4 grid place-content-center rounded-xl bg-white shadow-lg"
//             >

//                 <div className="bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
//                     <a href="#">
//                         <img className="p-8 rounded-t-lg" src={product.imageCover} alt="product image" />
//                     </a>
//                     <div className="px-5 pb-5">
//                         <a href="#">
//                             <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white line-clamp-1">{product.title}</h5>
//                         </a>
//                         <div className="flex items-center mt-2.5 mb-5">
//                             <div className="flex items-center space-x-1 rtl:space-x-reverse">
//                                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                 </svg>
//                                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                 </svg>
//                                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                 </svg>
//                                 <svg className="w-4 h-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                 </svg>
//                                 <svg className="w-4 h-4 text-gray-200 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
//                                     <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
//                                 </svg>
//                             </div>
//                             <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded-sm dark:bg-green-200 dark:text-green-800 ms-3">{product.ratingsAverage}</span>
//                         </div>
//                         <div className="flex items-center justify-between">
//                             <span className="text-2xl font-semibold text-gray-900 dark:text-white">{product.price}$</span>
//                             <Link href="#" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Add to cart</Link>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </motion.div>
//     );

// };



export default function Card({ product }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ margin: "-50px" }}
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
                        className="w-full h-64 object-cover"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="absolute inset-0 bg-black bg-opacity-10"
                    />
                </Link>

                <motion.button
                    whileHover={{ scale: 1.1, rotate: 6 }}
                    whileTap={{ scale: 0.95 }}
                    className="absolute top-4 right-4 p-3 bg-white rounded-full shadow-lg"
                >
                    <BiHeart className="h-5 w-5 text-gray-600 hover:text-red-500 transition-colors duration-300" />
                </motion.button>

            </div>
            <div className="p-5">
                <Link to={`/product/${product._id}`}>

                    <p className="text-gray-800 text-sm">{product.category?.name}</p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex justify-between items-center mb-3"
                    >

                        <h3 className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-green-600 transition-colors duration-300">
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
