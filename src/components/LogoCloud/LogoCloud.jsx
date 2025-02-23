import axios from "axios"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"


export default function LogoCloud() {
    const [logos, setlogos] = useState([])


    async function getBrands() {
        await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
            .then((res) => {
                setlogos(res.data.data)

            })
            .catch((err) => console.log(err))
    }

    useEffect(() => {
        getBrands()
    }, [])


    return (
        <div className="w-full py-6 mb-10">
            <div className="mx-auto w-full px-4 md:px-8">
                <div
                    className="group relative mt-6 flex gap-6 overflow-hidden p-2"
                    style={{
                        maskImage:
                            'linear-gradient(to left, transparent 0%, black 20%, black 80%, transparent 95%)',
                    }}
                >
                    {Array(logos?.length)
                        .fill(null)
                        .map((index) => (
                            <div
                                key={logos._id}
                                className="flex shrink-0 animate-logo-cloud flex-row justify-around gap-6"
                            >
                                {logos?.map((logo) => (
                                    <img key={logo._id}
                                        src={logo.image}
                                        className="h-28 w-full px-2"
                                        alt={`${logo.name}`}
                                    />
                                    // </Link>
                                ))}
                            </div>
                        ))}
                </div>
            </div>
        </div>
    )
}

