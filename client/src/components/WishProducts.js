import { useEffect } from 'react'
import SecTitle from './SecTitle'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { EyeIcon, XIcon } from '@heroicons/react/solid'
import Loader from './Loader'
import { deleteWishProduct, deleteWishProducts, resetState } from '../slices/wishSlice'
import { toast } from 'react-toastify'
import Error from './Error'

export default function WishProducts() {
    const { wishlist, loading, success, message } = useSelector(state => state.wishList)
    const dispatch = useDispatch()

    const totalPrice = wishlist.reduce((acc, item) => acc + item.productPrice, 0)

    useEffect(() => {
        if (success) toast(message, { type: 'success', autoClose: 2000 })
        dispatch(resetState())
    }, [success, message, dispatch])

    function deleteProduct(wishProductId) {
        dispatch(deleteWishProduct(wishProductId))
    }

    function clearWishlist() {
        dispatch(deleteWishProducts())
    }

    return (
        <section className="py-12">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="products added" />
                {loading
                    ? <Loader />
                    : wishlist.length ? (
                        <div className="flex flex-wrap justify-center gap-10 mt-6">
                            {
                                wishlist.map(wishProduct => (
                                    <div key={wishProduct._id} className="productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[35rem]">
                                        <div className="productImage relative w-full h-80">
                                            <button onClick={() => deleteProduct(wishProduct._id)} className="absolute group top-0 left-0 bg-red-500 py-2 px-4 rounded-lg cursor-pointer z-10 hover:bg-gray-700">
                                                <XIcon className="w-7 h-7 fill-white" />
                                            </button>
                                            <Link to={`/shop/${wishProduct.productSlug}`}>
                                                <button className="view absolute group top-0 right-0 bg-white py-2 px-4 rounded-lg border-2 border-solid border-gray-800 hover:bg-gray-800 cursor-pointer z-10">
                                                    <EyeIcon className="w-7 h-7 fill-gray-700 group-hover:fill-white" />
                                                </button>
                                            </Link>
                                            <img src={wishProduct.productImage} alt="" className="object-contain w-full h-80" />
                                        </div>
                                        <h3 className="font-semibold text-2xl text-gray-600 text-center py-4 lowercase">{wishProduct.productName}</h3>
                                        <p className="price text-red-500 font-medium text-3xl pb-6 text-center">${wishProduct.productPrice}/ -</p>
                                        <input type="number" className="w-full border-2 border-solid border-gray-800 rounded-lg p-3 text-xl text-gray-700 font-medium mb-4" min="1" defaultValue="1" />
                                        <button className="w-full bg-green-500 btn__style capitalize">add to cart</button>
                                    </div>
                                ))
                            }
                        </div>
                    ) : (
                        <Error errMsg="your wishlist is empty" />
                    )
                }

                <div className="grand-price bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[38rem] mx-auto mt-7">
                    <div className="total text-gray-600 font-medium text-3xl text-center">
                        grand total :
                        <span className="text-red-500"> ${totalPrice}/ -</span>
                    </div>
                    <button className="w-full bg-yellow-500 btn__style capitalize mt-4">continue shopping</button>
                    <button className={`w-full btn__style capitalize mt-4 ${wishlist.length ? 'bg-red-500' : 'bg-red-300 pointer-events-none'}`} onClick={clearWishlist}>delete all</button>
                </div>
            </div>
        </section>
    )
}
