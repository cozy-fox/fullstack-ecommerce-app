import { Link } from 'react-router-dom'

export default function Banner() {
    return (
        <main className="banner bg-white h-[45rem]">
            <div className="wrapper max-w-screen-xl mx-auto h-full flex items-center">
                <div className="content">
                    <h3 className="text-3xl text-orange-400 font-normal">don't panic, go organic</h3>
                    <h1 className="text-5xl py-5 font-semibold text-gray-800 uppercase w-[50rem]">reach for a healthier you with organic foods</h1>
                    <p className="text-gray-400 text-xl font-medium leading-loose w-[50rem]">Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae laboriosam cupiditate ratione deleniti modi accusamus?</p>
                    <Link to="/about">
                        <button className="bg-green-500 btn__style px-6 mt-4">About Us</button>
                    </Link>
                </div>
            </div>
        </main>
    )
}