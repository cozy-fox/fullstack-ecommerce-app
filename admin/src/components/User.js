import { useDispatch } from 'react-redux'
import { deleteUser } from '../slices/userSlice'

export default function User({ user }) {
    const dispatch = useDispatch()

    function deleteUserAcc() {
        dispatch(deleteUser(user._id))
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
            <button onClick={deleteUserAcc} className="flex-grow py-4 w-full bg-orange-600 btn__style cursor-pointer capitalize">delete</button>
        </div>
    )
}
