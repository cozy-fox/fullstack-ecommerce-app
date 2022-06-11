import { Link } from 'react-router-dom'
import SecTitle from '../components/SecTitle'
import Loader from '../components/Loader'
import { useSelector } from 'react-redux'
import CartProduct from '../components/CartProduct'
import { useEffect } from 'react'
import { resetState, deleteItems } from '../slices/cartSlice'
import { reset, urlForCheckout } from '../slices/paymentSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import Error from '../components/Error'

export default function Cart() {
    const { cartItems, loading, success, error, message } = useSelector(state => state.cart)
    const { url, checkout_loading, checkout_success, checkout_error, checkout_message } = useSelector(state => state.pay)
    const dispatch = useDispatch()

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0)

    useEffect(() => {
        if (success) toast(message, { type: 'success', autoClose: 2000 })
        if (error) toast(message, { type: 'error', autoClose: 2000 })
        if (success || error) dispatch(resetState())
    }, [success, error, message, dispatch])

    useEffect(() => {
        if (checkout_success) {
            window.location = url
        }
        if (checkout_error) toast(checkout_message, { type: 'error', autoClose: 2000 })
        if (checkout_success || checkout_error) dispatch(reset())
    }, [checkout_success, checkout_error, checkout_message, url, dispatch])

    function clearCart() {
        dispatch(deleteItems())
    }

    async function paymentProcess() {
        const itemData = cartItems.map(item => item._id)
        dispatch(urlForCheckout(itemData))
    }

    return (
        <section className="section py-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="products added" />
                {loading
                    ? <Loader />
                    : cartItems.length ? (
                        <div className="flex flex-wrap justify-center gap-10 mt-6">
                            {cartItems.map(item => (
                                <CartProduct key={item._id} product={item} />
                            ))}
                        </div>

                    ) : (
                        <Error errMsg="your cart is empty" />
                    )}

                <div className="grand-price bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[38rem] mx-auto mt-7">
                    <div className="total text-gray-600 font-medium text-3xl text-center">
                        grand total :
                        <span className="text-red-500"> ${totalPrice}/ -</span>
                    </div>
                    <Link to="/shop">
                        <button className="w-full bg-yellow-500 btn__style capitalize mt-4">continue shopping</button>
                    </Link>
                    <button className={`w-full btn__style capitalize mt-4 ${cartItems.length ? 'bg-red-500' : 'bg-red-300 pointer-events-none'}`} onClick={clearCart}>delete all</button>
                    <button className={`w-full btn__style capitalize mt-4 ${cartItems.length && !checkout_loading ? 'bg-green-500' : 'bg-green-300 pointer-events-none'}`} onClick={paymentProcess}>proceed to checkout</button>
                </div>
            </div>
        </section>
    )
}
