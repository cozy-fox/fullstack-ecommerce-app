import SecLayout from "../components/SecLayout";
import SecTitle from "../components/SecTitle";
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <SecLayout>
            <SecTitle name="dashboard" />
            <div className="pages grid grid-cols-4 gap-6 mt-7">

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">$23/-</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total pending
                    </div>
                    <Link to="/orders">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see orders</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">$63/-</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        fulfilled orders
                    </div>
                    <Link to="/orders">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see orders</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">6</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        orders placed
                    </div>
                    <Link to="/orders">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see orders</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">10</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        products added
                    </div>
                    <Link to="/products">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see products</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">4</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total users
                    </div>
                    <Link to="/accounts">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see accounts</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">1</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total admins
                    </div>
                    <Link to="/accounts">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see accounts</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">5</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total accounts
                    </div>
                    <Link to="/accounts">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see accounts</button>
                    </Link>
                </div>

                <div className="border-2 border-solid border-gray-800 rounded-lg p-4 bg-white">
                    <h2 className="text-5xl text-gray-800 text-center pt-1 pb-3 font-semibold">5</h2>
                    <div className="pending mb-2 border-2 border-solid border-gray-800 rounded-lg p-4 text-2xl text-center font-medium text-gray-800">
                        total messages
                    </div>
                    <Link to="/messages">
                        <button className="btn__style capitalize bg-green-600 py-4 w-full">see messages</button>
                    </Link>
                </div>

            </div>
        </SecLayout>
    )
}
