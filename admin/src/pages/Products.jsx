import { useEffect } from 'react'
import SecLayout from '../components/SecLayout'
import SecTitle from '../components/SecTitle'
import { useSelector, useDispatch } from 'react-redux'
import Loader from '../components/Loader'
import Error from '../components/Error'
import Order from '../components/Order'
import { toast } from 'react-toastify'
import { productReset } from '../slices/orderSlice'
import Product from '../components/Product'

export default function Products() {
    const { products, product_loading, product_success, product_error, product_message } = useSelector(state => state.product)


    return (
        <SecLayout>
            <SecTitle name="placed orders" />
            {product_loading
                ? <Loader />
                : products.length ? (
                    <div className="flex flex-wrap justify-center gap-6 mt-6">
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
        </SecLayout>
    )
}
