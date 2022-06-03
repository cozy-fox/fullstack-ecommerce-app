import SecTitle from './SecTitle'
import { Link } from 'react-router-dom'
import Loader from './Loader'
import { useFetch } from '../hooks/fetchData'

export default function Cats() {
    const { data: categories, isLoading } = useFetch('/category/')

    return (
        <section className="section py-10">
            <div className="wrapper max-w-screen-xl mx-auto">
                <SecTitle name="shop by category" />
                {
                    isLoading
                        ? <Loader />
                        : (
                            <div className="categories grid grid-cols-4 gap-5 mt-6">
                                {categories.map(category => (
                                    <div key={category._id} className="catBox bg-white border-2 border-gray-800 border-solid rounded-lg p-6">
                                        <img src={category.image} alt="" className="catImage object-cover w-full h-80" />
                                        <h1 className="text-center text-2xl text-gray-700 font-semibold uppercase py-6">{category.title}</h1>
                                        <p className="text-center text-xl text-gray-500 font-medium leading-normal">{category.description}</p>
                                        <Link to={category.slug}>
                                            <div className="text-center">
                                                <button className="bg-green-500 btn__style px-6 mt-4">{category.title}</button>
                                            </div>
                                        </Link>
                                    </div>
                                ))}
                            </div>
                        )
                }
            </div>
        </section>
    )
}
