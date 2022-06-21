import { Link, useNavigate } from "react-router-dom";
import { UserIcon } from '@heroicons/react/solid'
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const defaultImage = 'https://firebasestorage.googleapis.com/v0/b/fullstack-ecommerce-f3adb.appspot.com/o/guest.webp?alt=media&token=da29d69d-0134-4b56-a295-55b348de4cbe'

export default function MainHeader({ user }) {
    const [showUser, setShowUser] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    function logoutUser() {
        dispatch(logout())
    }

    return (
        <header className="header py-6 bg-white shadow-md sticky top-0 left-0 z-50">
            <div className="wrapper max-w-screen-xl mx-auto flex justify-between items-center">
                <Link to="/">
                    <h2 className="text-gray-600 text-3xl font-normal cursor-pointer">Admin<span className="text-green-500">Panel</span></h2>
                </Link>

                <nav className="space-x-6">
                    <Link to="/">
                        <button className="text-gray-500 text-2xl hover:text-green-600 hover:underline font-normal">home</button>
                    </Link>
                    <Link to="/products">
                        <button className="text-gray-500 text-2xl hover:text-green-600 hover:underline font-normal">products</button>
                    </Link>
                    <Link to="/orders">
                        <button className="text-gray-500 text-2xl hover:text-green-600 hover:underline font-normal">orders</button>
                    </Link>
                    <Link to="/users">
                        <button className="text-gray-500 text-2xl hover:text-green-600 hover:underline font-normal">users</button>
                    </Link>
                    <Link to="/messages">
                        <button className="text-gray-500 text-2xl hover:text-green-600 hover:underline font-normal">messages</button>
                    </Link>
                </nav>

                {user && <div className="relative">
                    <UserIcon onBlur={() => setShowUser(false)} tabIndex={1} onClick={() => setShowUser(state => !state)} className="w-9 h-9 fill-gray-500 cursor-pointer hover:fill-green-500 transition-colors" />
                    <div className={`${showUser ? 'block' : 'hidden'} userProfile w-[26rem] bg-white p-6 absolute top-full -left-60 border-2 border-gray-600 border-solid rounded-xl overflow-hidden`}>
                        <img src={user.image ? user.image : defaultImage} alt="" className="userAvatar w-40 h-40 rounded-full object-cover mx-auto" />
                        <h3 className="text-2xl text-gray-500 font-normal text-center py-4">{user.name}</h3>
                        <button onPointerDown={() => navigate('/profile')} className="w-full bg-green-500 btn__style py-4 mb-4">Update Profile</button>
                        <button className="w-full bg-red-500 btn__style py-4" onPointerDown={logoutUser}>Log Out</button>
                    </div>
                </div>}


            </div>
        </header>
    )
}