import { useState, useEffect } from 'react'
import { useForm } from "react-hook-form";
import InputErr from '../components/InputErr';
import { toast } from 'react-toastify';
import { Link } from "react-router-dom";
import axios from 'axios'
import { storage, ref, uploadBytesResumable, getDownloadURL } from "../firebase";
import Loader from '../components/Loader';
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Register() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        if (user) {
            navigate('/')
        }
    }, [user, navigate])

    async function registerUser(data) {
        const { name, password, email, imageFile, cpassword } = data

        if (password !== cpassword) {
            return toast("Confirm password doesn't match", { type: 'warning', autoClose: 2000 })
        }

        setLoading(true)

        try {
            let userId
            const res = await axios.post('/auth/register', { name, password, email })
            userId = res.data.userId
            if (imageFile.length) {
                const storageRef = ref(storage, userId);
                const uploadTask = uploadBytesResumable(storageRef, imageFile[0]);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log('Upload is ' + progress + '% done');
                        switch (snapshot.state) {
                            case 'paused':
                                console.log('Upload is paused');
                                break;
                            case 'running':
                                console.log('Upload is running');
                                break;
                        }
                    },
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                console.log("User doesn't have permission to access the object")
                                break;
                            case 'storage/canceled':
                                console.log("User canceled the upload")
                                break;
                            case 'storage/unknown':
                                console.log("Unknown error occurred, inspect error.serverResponse")
                                break;
                        }
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                            await axios.post(`/auth/register?userIdForUpdate=${userId}`, { image: downloadURL })
                            setLoading(false)
                            reset()
                            navigate('/login')
                        });
                    }
                );
            } else {
                setLoading(false)
                reset()
                navigate('/login')
            }
        } catch (err) {
            setLoading(false)
            toast(err.response.data.message, { type: 'error', autoClose: 2000 })
        }
    }

    return (
        <section className="bg-white w-full h-screen flex items-center justify-center">
            <form className="w-[40rem] border-2 border-gray-700 border-solid rounded-lg p-4" onSubmit={handleSubmit(registerUser)}>
                <h2 className="text-center text-4xl uppercase text-gray-800 font-semibold pb-5">register now</h2>
                <input {...register("name", { required: true })} type="text" placeholder="enter your name" className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                <input {...register("email", { required: true })} type="email" placeholder="enter your email" className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800 my-5" />
                <input {...register("password", { required: true })} type="password" placeholder="enter your password" className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                <input {...register("cpassword", { required: true })} type="password" placeholder="confirm your password" className="my-5 border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                <input {...register("imageFile")} type="file" className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                {
                    loading
                        ? <Loader customCss="my-5" />
                        : <button className={`w-full btn__style my-5 bg-green-600`}>Register Now</button>
                }
                {errors.name && <InputErr msg="Your name" />}
                {errors.email && <InputErr msg="Your mail-address" />}
                {errors.password && <InputErr msg="A password" />}
                {errors.cpassword && <InputErr msg="Confirming password" />}
                <div className="text-gray-600 text-2xl font-normal text-center">
                    already have an account?
                    <Link to="/login">
                        <span className="text-green-600 cursor-pointer hover:underline"> login now</span>
                    </Link>
                </div>
            </form>
        </section>
    )
}
