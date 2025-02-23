import axios from "axios"
import { useEffect, useState } from "react"
import BrandCard from "../../components/BrandCard/BrandCard"
import Loader from "../../components/Loader/Loader"



export default function Brands() {

    const [logos, setlogos] = useState([])
    const [loader, setloader] = useState([])


    async function getBrands() {
        setloader(true)
        await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then((res) => {
                setlogos(res.data.data)
                setloader(false)

            })
            .catch((err) => {
                console.log(err)
                setloader(false)
            }
            )
    }

    useEffect(() => {
        getBrands()
        window.scrollTo(0, 0)

    }, [])
    return (
        <>
            <div className="container ">
                <h1 className='text-4xl font-bold text-center my-12'>
                    Brands
                </h1>
                <div className="flex my-10 flex-wrap justify-center gap-4">

                    {
                        logos.map((brand) => {
                            return (
                                <div key={brand._id} >
                                    <BrandCard brand={brand} />
                                </div>
                            )
                        })
                    }
                </div>
            </div>
            {loader && <Loader />}
        </>
    )
}
