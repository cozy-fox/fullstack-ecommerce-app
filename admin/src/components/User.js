import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { deleteUser } from '../slices/userSlice'
import deleteImage from '../utils/deleteImg'
import Loader from './Loader'

export default function User({ user }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(false)

    async function deleteUserAcc() {
        setIsLoading(true)
        try {
            if (!user.image.includes('guest.webp')) {
                await deleteImage(user._id)
            }
            dispatch(deleteUser(user._id))
            setIsLoading(false)
        } catch (err) {
            const message = (err.response && err.response.data && err.response.data.message) || err.message || err.toString()
            toast(message, { type: 'error', autoClose: 2000 })
            setIsLoading(false)
        }
    }

    return (
        <div className="border-2 border-gray-800 border-solid rounded-lg p-6 w-[30rem] bg-white text-center">
            <img src={user.image} alt="" className="w-44 h-44 rounded-full mx-auto object-cover mb-4" />
            <p className="text-gray-500 text-xl font-medium mb-3">
                user id:
                <span className="text-green-500"> {user._id}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                username:
                <span className="text-green-500"> {user.name}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                email:
                <span className="text-green-500"> {user.email}</span>
            </p>
            <p className="text-gray-500 text-xl font-medium mb-3">
                user type:
                <span className="text-green-500"> {user.isAdmin ? 'admin' : 'user'}</span>
            </p>
            {isLoading ? <Loader customCss="mb-5" />
                : (
                    <button onClick={deleteUserAcc} className="flex-grow py-4 w-full bg-orange-600 btn__style cursor-pointer capitalize">delete</button>
                )
            }
        </div>
    )
}
