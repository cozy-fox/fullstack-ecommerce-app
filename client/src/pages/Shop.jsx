import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useWishlist } from '../hooks/wishlist'
import SecTitle from '../components/SecTitle'
import { Link } from 'react-router-dom'
import { EyeIcon } from '@heroicons/react/solid'
import Loader from '../components/Loader'
import { setCurrentCategory } from '../slices/categorySlice'

export default function Shop() {
    const { products, loading } = useSelector(state => state.products)
    const { categories, currentCategory } = useSelector(state => state.categories)
    const [active, setActive] = useState(currentCategory)
    const { wishlist } = useWishlist()
    const dispatch = useDispatch()

    function selectCat(slug) {
        dispatch(setCurrentCategory(slug))
        setActive(slug)
    }

    return (
        <section className="section py-10">
            <div className="wrapper max-w-screen-xl mx-auto">

                <div className="categories">
                    <div className="products grid grid-cols-5 gap-6 mb-10">
                        <button onClick={() => selectCat('all')} className={`${active === 'all' ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'} border-2 border-gray-800 border-solid rounded-lg py-4 text-center hover:bg-gray-700 hover:text-white text-xl font-semibold`}>
                            All
                        </button>
                        {
                            categories.map(category => (
                                <button onClick={() => selectCat(category.slug)} key={category._id} className={`${active === category.slug ? 'bg-gray-700 text-white' : 'bg-white text-gray-600'} border-2 border-gray-800 border-solid rounded-lg py-4 text-center hover:bg-gray-700 hover:text-white text-xl font-semibold`}>
                                    {category.title}
                                </button>
                            ))
                        }
                    </div>
                </div>

                <SecTitle name="all products" />
                {loading
                    ? <Loader />
                    : (
                        <div className="products grid grid-cols-4 gap-6 mt-6">
                            {products.map(product => {
                                if (product.categories.includes(currentCategory)) {
                                    return <div key={product._id} className="productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4">
                                        <div className="productImage relative w-full h-80">
                                            <div className="price absolute top-0 left-0 bg-red-500 text-white text-lg p-2 rounded-lg">
                                                $<span className="text-white text-2xl font-medium px-1">{product.price}</span>/-
                                            </div>
                                            <Link to={`/shop/${product.slug}`}>
                                                <button className="view absolute group top-0 right-0 bg-white py-2 px-4 rounded-lg border-2 border-solid border-gray-800 hover:bg-gray-800 cursor-pointer z-10">
                                                    <EyeIcon className="w-7 h-7 fill-gray-700 group-hover:fill-white" />
                                                </button>
                                            </Link>
                                            <img src={product.productImage} alt="" className="object-contain w-full h-80" />
                                        </div>
                                        <h3 className="font-semibold text-2xl text-gray-600 text-center py-4 lowercase">{product.title}</h3>
                                        <input type="number" className="w-full border-2 border-solid border-gray-800 rounded-lg p-3 text-xl text-gray-700 font-medium" min="1" max={product.inStock} defaultValue="1" />
                                        <button className="w-full bg-yellow-500 btn__style mt-4 mb-3 capitalize" onClick={() => wishlist(product.slug, product.productImage, product.price, product.title)}>add to wishlist</button>
                                        <button className="w-full bg-green-500 btn__style capitalize">add to cart</button>
                                    </div>
                                }
                            })}
                        </div>
                    )
                }
            </div>
        </section>
    )
}
