import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import Loader from '../components/Loader';
import { useNavigate } from "react-router-dom";
import SecTitle from '../components/SecTitle'
import { useForm } from "react-hook-form";
import uploadImage from '../utils/uploadImg'
import { updateUser, resetState } from '../slices/authSlice'

export default function Profile({ user }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { register, handleSubmit, reset } = useForm();
    const { message, loading, error, success } = useSelector(state => state.auth)
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (success) {
            toast(message, { type: 'success', autoClose: 2000 })
            reset()
        }
        if (!loading) setIsLoading(false)
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [message, success, error, loading, dispatch, reset])

    async function updateProfile(data) {
        const { name, email, oldPass, newPass, confirmPass, image } = data

        if (!newPass && !oldPass && !confirmPass && !name && !email && !image[0]) {
            return toast("All fields are empty. Nothing to update!!!", { type: 'info', autoClose: 2000 })
        }

        if (newPass && oldPass && confirmPass) {
            if (newPass !== confirmPass) {
                return toast("Confirm password doesn't match", { type: 'warning', autoClose: 2000 })
            }
        } else {
            if (newPass || oldPass || confirmPass) {
                return toast("Fill other password fields to update your password", { type: 'error', autoClose: 2000 })
            }
        }

        let imgUrl
        if (image[0]) {
            setIsLoading(true)
            imgUrl = await uploadImage(image[0], user._id)
        }
        dispatch(updateUser({ name, email, oldPass, newPass, image: imgUrl }))
    }

    return (
        <section className="section py-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="update profile" />
                <form className="reviews mt-6 w-[60rem] border-2 border-gray-700 border-solid rounded-lg p-5 mx-auto bg-white" onSubmit={handleSubmit(updateProfile)}>
                    <img src={user.image} alt="" className="h-56 w-56 rounded-full object-cover mx-auto" />
                    <div className="fields grid grid-cols-2 gap-4 mt-6">

                        <div className="inputField">
                            <label htmlFor="username" className="text-gray-500 font-medium text-xl mb-2 inline-block">username :</label>
                            <input {...register("name")} defaultValue={user.name} type="text" id="username" placeholder="your username" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="old" className="text-gray-500 font-medium text-xl mb-2 inline-block">old password :</label>
                            <input {...register("oldPass")} type="password" id="old" placeholder="enter old password" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="email" className="text-gray-500 font-medium text-xl mb-2 inline-block">email :</label>
                            <input {...register("email")} defaultValue={user.email} type="email" id="email" placeholder="your email" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="new" className="text-gray-500 font-medium text-xl mb-2 inline-block">new password :</label>
                            <input {...register("newPass")} type="password" id="new" placeholder="enter new password" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="pic" className="text-gray-500 font-medium text-xl mb-2 inline-block">update pic :</label>
                            <input {...register("image")} type="file" id="pic" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-[0.45rem] text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="confirm" className="text-gray-500 font-medium text-xl mb-2 inline-block">confirm password :</label>
                            <input {...register("confirmPass")} type="password" id="confirm" placeholder="confirm new password" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                    </div>
                    {
                        loading || isLoading
                            ? <Loader customCss="mb-4" /> :
                            <div className="flex gap-4 mt-5">
                                <input type="submit" value="Update Profile" className="flex-grow py-4 w-full bg-green-600 btn__style cursor-pointer" />
                                <button onClick={() => navigate('/')} className="flex-grow py-4 w-full bg-yellow-600 btn__style cursor-pointer capitalize">cancel</button>
                            </div>
                    }
                </form>
            </div>
        </section>
    )
}
