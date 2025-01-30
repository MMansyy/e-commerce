import Navbar from '../../components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../../components/Footer/Footer'

export default function Mainlayout() {
    return (
        <>
            <Navbar />
                <Outlet />
            <Footer />
        </>
    )
}
