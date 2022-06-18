import { useEffect, useState } from 'react'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Order from '../components/Order'
import { toast } from 'react-toastify'
import { productReset } from '../slices/orderSlice'
import Product from '../components/Product'
import { useForm } from "react-hook-form";
import uploadImage from '../utils/uploadImg'
import { v1 } from 'uuid'

export default function Products() {
    const { products, product_loading, product_success, product_error, product_message } = useSelector(state => state.product)
    const { categories } = useSelector(state => state.categories)
    const { register, handleSubmit, reset } = useForm();
    const [isLoading, setIsLoading] = useState(false)

    async function createProduct(data) {
        const { title, price, inStock, productImage, description } = data

        const categoriesSlug = categories.map(category => category.slug)
        const selectCategories = categoriesSlug.filter(slug => (data[slug]))

        if (!productImage[0]) return toast("Product image is required!!!", { type: 'info', autoClose: 2000 })
        if (!selectCategories.length) return toast("At least one category in required!!!", { type: 'info', autoClose: 2000 })

        setIsLoading(true)
        const imgUrl = await uploadImage(productImage[0], v1())
        console.log(imgUrl)
        // dispatch(updateUser({ name, email, oldPass, newPass, image: imgUrl }))
    }

    return (
        <SecLayout>
            <div className="productForm">

                <SecTitle name="add new product" />

                <form className="reviews mt-6 w-[60rem] border-2 border-gray-700 border-solid rounded-lg p-5 mx-auto bg-white" onSubmit={handleSubmit(createProduct)}>
                    <div className="fields grid grid-cols-2 gap-4">

                        <input {...register("title", { required: true })} type="text" placeholder="enter product name" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

                        <input {...register("price", { required: true })} type="number" placeholder="enter product price" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

                        <input {...register("inStock", { required: true })} type="number" placeholder="stock" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800" />

                        <input {...register("productImage")} type="file" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-1 text-xl text-gray-800" />

                        <div className="selectCategories col-span-2 flex flex-wrap gap-3 items-center border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800">
                            {
                                categories.map(category => {
                                    return (
                                        <div key={category._id} className="flex gap-1 items-center">
                                            <input type="checkbox" id={category.slug} {...register(category.slug)} />
                                            <label htmlFor={category.slug} className="text-gray-500 font-medium text-xl inline-block select-none"> {category.title}</label>
                                        </div>
                                    )
                                })
                            }
                        </div>

                        <textarea {...register("description")} className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg col-span-2 p-3 text-xl text-gray-800 h-80 resize-none" />

                    </div>

                    <input type="submit" value="Add Product" className="py-3 w-full bg-green-600 btn__style cursor-pointer mt-4" />
                    {/* {
                            loading || isLoading
                                ? <Loader customCss="mb-4" /> :
                                <div className="flex gap-4 mt-5">
                                    <input type="submit" value="Update Profile" className="flex-grow py-4 w-full bg-green-600 btn__style cursor-pointer" />
                                    <button onClick={() => navigate('/')} className="flex-grow py-4 w-full bg-yellow-600 btn__style cursor-pointer capitalize">cancel</button>
                                </div>
                        } */}
                </form>

            </div>

            <div className="mt-8">
                <SecTitle name="products added" />
                {product_loading
                    ? <Loader />
                    : products.length ? (
                        <div className="grid grid-cols-4 gap-6 mt-6">
                            {
                                products.map(product => (
                                    <Product key={product._id} product={product} />
                                ))
                            }
                        </div>
                    ) : (
                        <Error errMsg="no products placed yet" />
                    )
                }
            </div>
        </SecLayout>
    )
}
