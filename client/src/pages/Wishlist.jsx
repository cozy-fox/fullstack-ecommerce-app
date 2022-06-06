import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import WishProducts from '../components/WishProducts'

export default function Wishlist() {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user, navigate])

    return (
        <>
            <WishProducts />
        </>
    )
}
