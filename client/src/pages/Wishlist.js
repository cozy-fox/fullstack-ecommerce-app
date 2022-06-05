import { useEffect } from 'react'
import MainHeader from '../components/MainHeader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WishProducts from '../components/WishProducts'
import MainFooter from "../components/MainFooter"

export default function Wishlist() {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    return (
        <>
            <MainHeader />
            <WishProducts />
            <MainFooter />
        </>
    )
}
