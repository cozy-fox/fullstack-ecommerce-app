import { useEffect } from 'react'
import MainHeader from '../components/MainHeader'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Wishlist() {
    const { user } = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

    return (
        <>
            <MainHeader />
            <div>Wishlist</div>
        </>
    )
}
