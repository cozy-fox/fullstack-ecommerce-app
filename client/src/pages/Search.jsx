import { useSelector } from 'react-redux'
import { useState } from 'react'
import { useWishlist } from '../hooks/wishlist'
import { Link } from 'react-router-dom'
import { EyeIcon } from '@heroicons/react/solid'
import Error from '../components/Error'

export default function Search() {
    const { products } = useSelector(state => state.products)
    const [filteredProducts, setFilteredProducts] = useState([])
    const [error, setError] = useState('')
    const [value, setValue] = useState('')
    const { wishlist } = useWishlist()

    function showProducts(e) {
        e.preventDefault()
        const inputValue = value.toLowerCase()
        const productsToShow = products.filter(product => product.slug.includes(inputValue) || product.title.toLowerCase().includes(inputValue))
        if (productsToShow.length) {
            setFilteredProducts(productsToShow)
            setError('')
        } else {
            setError("Product couldn't found")
            setFilteredProducts([])
        }
    }

    return (
        <section className="section py-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <form className="flex gap-4 items-center">
                    <input onChange={e => setValue(e.target.value)} type="text" placeholder="Search products..." className="border-gray-800 border-solid border-2 rounded-lg w-full p-3 text-xl text-gray-800" />
                    <input onClick={showProducts} type="submit" value="Search" className={`py-4 px-8 btn__style cursor-pointer ${value ? 'bg-green-600' : 'bg-green-400 pointer-events-none'}`} />
                </form>

                <div className="flex flex-wrap justify-center gap-10 mt-6">
                    {
                        error ? (
                            <Error errMsg={error} />
                        ) : (
                            filteredProducts.map(product => (
                                <div key={product._id} className="productBox bg-white border-2 border-gray-800 border-solid rounded-lg p-4 w-[32rem]">
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
                            ))
                        )

                    }
                </div>
            </div>
        </section>
    )
}
