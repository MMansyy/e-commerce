import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Loader from '../../components/Loader/Loader'

export default function Categories() {

    const [categories, setcategories] = useState([])
    const [loading, setloading] = useState(false)

    async function getCategories() {
        setloading(true)
        const res = axios.get('https://ecommerce.routemisr.com/api/v1/categories')
            .then(res => {
                setcategories(res.data.data)
                setloading(false)
            })
            .catch(err => {
                
                setloading(false)
            })
    }

    useEffect(() => {
        getCategories()
        
        window.scrollTo(0, 0)

        
    }, [])





    return (
        <>
            {loading && <Loader />}
            <div className="container px-12 md:px-32 py-16 ">
                <h1 className='text-4xl font-bold flex justify-center items-center mb-12'>Categories</h1>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <Link className="row-span-1  md:row-span-3 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className=" w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[0]?.image}
                            alt={categories[0]?.name}
                        />
                        <Link to={`${categories[0]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -left-[100%] opacity-50 top-0 transition-all duration-700 ease-in-out 
            group-hover:left-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[0]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-4 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[1]?.image}
                            alt={categories[1]?.name}
                        />
                        <Link to={`${categories[1]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -top-[100%] opacity-50 transition-all duration-700 ease-in-out 
            group-hover:top-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[1]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-2 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[9]?.image}
                            alt={categories[9]?.name}
                        />
                        <Link to={`${categories[9]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -bottom-[100%] opacity-50 transition-all duration-700 ease-in-out 
            group-hover:bottom-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[9]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-2 md:col-start-3 md:row-start-7 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[3]?.image}
                            alt={categories[3]?.name}
                        />
                        <Link to={`${categories[3]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -right-[100%] opacity-50 top-0 transition-all duration-700 ease-in-out 
            group-hover:right-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[3]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-3 md:col-start-1 md:row-start-4 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[4]?.image}
                            alt={categories[4]?.name}
                        />
                        <Link to={`${categories[4]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -left-[100%] opacity-50 top-0 transition-all duration-700 ease-in-out 
            group-hover:left-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[4]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-3 md:col-start-2 md:row-start-5 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[5]?.image}
                            alt={categories[5]?.name}
                        />
                        <Link to={`${categories[5]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -top-[100%] opacity-50 transition-all duration-700 ease-in-out 
            group-hover:top-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[5]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-2 md:col-start-3 md:row-start-9 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[6]?.image}
                            alt={categories[6]?.name}
                        />
                        <Link to={`${categories[6]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -bottom-[100%] opacity-50 transition-all duration-700 ease-in-out 
            group-hover:bottom-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[6]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-4 md:col-start-1 md:row-start-7 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[7]?.image}
                            alt={categories[7]?.name}
                        />
                        <Link to={`${categories[7]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -right-[100%] opacity-50 top-0 transition-all duration-700 ease-in-out 
            group-hover:right-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[7]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-3 md:col-start-2 md:row-start-8 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[8]?.image}
                            alt={categories[8]?.name}
                        />
                        <Link to={`${categories[8]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -top-[100%] opacity-50 transition-all duration-700 ease-in-out 
            group-hover:top-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[8]?.name}</h1>
                        </Link>
                    </Link>

                    <Link className="row-span-1   md:row-span-4  md:col-start-3 md:row-start-3 relative border border-gray-400 rounded-lg group overflow-hidden cursor-pointer">
                        <img className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                            src={categories[2]?.image}
                            alt={categories[2]?.name}
                        />
                        <Link to={`${categories[2]?._id}`} className="absolute bg-black group-hover:backdrop-blur-md bg-opacity-50 h-full w-full flex items-center justify-center 
            -bottom-[100%] opacity-50 transition-all duration-700 ease-in-out 
            group-hover:bottom-0 group-hover:opacity-100">
                            <h1 className="text-white text-2xl font-bold text-center">{categories[2]?.name}</h1>
                        </Link>
                    </Link>
                </div>

            </div>
        </>
    )
}
