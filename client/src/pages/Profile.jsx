import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../firebase";
import Loader from '../components/Loader';
import { useNavigate } from "react-router-dom";
import SecTitle from '../components/SecTitle'
import { useForm } from "react-hook-form";
import InputErr from '../components/InputErr';
import axios from 'axios'
import uploadImage from '../utils/uploadImg'

export default function Profile({ user }) {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    async function updateProfile(data) {
        if (!data.new && !data.old && !data.confirm && !data.name && !data.email && !data.image[0]) {
            return toast("All fields are empty. Nothing to update!!!", { type: 'info', autoClose: 2000 })
        }

        if (data.new && data.old && data.confirm) {
            if (data.new !== data.confirm) {
                return toast("Confirm password doesn't match", { type: 'warning', autoClose: 2000 })
            }
        } else {
            if (data.new || data.old || data.confirm) {
                return toast("Fill other password fields to update your password", { type: 'error', autoClose: 2000 })
            }
        }

        let imgUrl
        if (data.image[0]) {
            imgUrl = await uploadImage(data.image[0], user._id)
        }

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
                            <input {...register("old")} type="password" id="old" placeholder="enter old password" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="email" className="text-gray-500 font-medium text-xl mb-2 inline-block">email :</label>
                            <input {...register("email")} defaultValue={user.email} type="email" id="email" placeholder="your email" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="new" className="text-gray-500 font-medium text-xl mb-2 inline-block">new password :</label>
                            <input {...register("new")} type="password" id="new" placeholder="enter new password" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="pic" className="text-gray-500 font-medium text-xl mb-2 inline-block">update pic :</label>
                            <input {...register("image")} type="file" id="pic" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-[0.45rem] text-xl text-gray-800" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="confirm" className="text-gray-500 font-medium text-xl mb-2 inline-block">confirm password :</label>
                            <input {...register("confirm")} type="password" id="confirm" placeholder="confirm new password" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                        </div>

                        <input type="submit" value="Update Profile" className="py-4 w-full bg-green-600 btn__style cursor-pointer" />
                        <button onClick={() => navigate('/')} className="py-4 w-full bg-yellow-600 btn__style cursor-pointer capitalize">cancel</button>

                    </div>
                </form>
            </div>
        </section>
    )
}
