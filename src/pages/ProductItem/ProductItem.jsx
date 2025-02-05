import axios from "axios"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import Slider from "react-slick";
import { motion } from "framer-motion";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductItem() {

    const { id } = useParams()
    const [product, setProduct] = useState({});

    function getProduct() {
        axios(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
            .then((response) => {
                setProduct(response.data.data)
                console.log(response.data.data)
            })
            .catch((error) => console.log(error))
    }

    useEffect(() => {
        getProduct()
    }, [])

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

    return (
        <div className="max-w-6xl mx-auto p-8 flex flex-col md:flex-row gap-8 bg-gray-100 text-gray-900 rounded-xl shadow-xl">
            <div className="w-full md:w-1/2">
                <Slider {...settings}>
                    {product.images && product.images.length > 0 ? (
                        product.images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt="Product"
                                className="rounded-xl w-full h-[47rem] object-cover shadow-lg border border-gray-300"
                            />
                        ))
                    ) : (
                        <p className="text-gray-500 text-center"></p>
                    )}
                </Slider>
            </div>

            <div className="w-full md:w-1/2 p-6 bg-white border border-gray-300 rounded-xl shadow-md space-y-6">
                <h2 className="text-4xl font-extrabold text-green-600">{product.title}</h2>
                <p className="text-lg text-gray-700 leading-relaxed">{product.description}</p>
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



                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg shadow-md transition-all duration-300"
                >
                    Add to Cart
                </motion.button>

                <div className="flex justify-center items-center">
                    <button className="w-3/4 text-center bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded-lg transition-all duration-200">
                        Wishlist
                    </button>
                </div>
            </div>
        </div >
    );
}
