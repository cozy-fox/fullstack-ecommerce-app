import { useForm } from "react-hook-form";
import { useSelector } from "react-redux"

export default function Checkout() {
    const { cartItems } = useSelector(state => state.cart)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

    const totalPrice = cartItems.reduce((acc, item) => acc + (item.productPrice * item.quantity), 0)

    function paymentProcess(data) {
        console.log(data)
    }

    return (
        <section className="section py-10">
            <div className="wrapper max-w-screen-xl mx-auto">

                <div className="cartProducts flex gap-5 justify-center">
                    {cartItems.map(item => (
                        <div key={item._id} className="bg-white border-2 border-gray-800 border-solid rounded-lg py-2 px-5 font-medium text-gray-600 text-xl">
                            {item.productName}
                            <span className="text-red-600"> (${item.productPrice}/- x {item.quantity})</span>
                        </div>
                    ))}
                </div>

                <div className="total text-gray-600 font-medium text-3xl text-center py-8">
                    grand total :
                    <span className="text-red-500"> ${totalPrice}/ -</span>
                </div>

                <form className="w-[85rem] border-2 border-gray-700 border-solid rounded-lg p-4 mx-auto" onSubmit={handleSubmit(paymentProcess)}>
                    <h1 className="rounded-lg py-4 bg-gray-800 uppercase text-white text-center text-4xl font-semibold">
                        place your order
                    </h1>

                    <div className="fields grid grid-cols-2 gap-4 mt-6">
                        <div className="inputField">
                            <label htmlFor="name" className="text-gray-500 font-medium text-xl mb-2 inline-block">your name :</label>
                            <input {...register("name", { required: true })} type="text" id="name" placeholder="enter your name" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="number" className="text-gray-500 font-medium text-xl mb-2 inline-block">your number :</label>
                            <input {...register("number", { required: true })} type="number" id="number" placeholder="enter your number" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="email" className="text-gray-500 font-medium text-xl mb-2 inline-block">your email :</label>
                            <input {...register("email", { required: true })} type="email" id="email" placeholder="enter your email" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="address1" className="text-gray-500 font-medium text-xl mb-2 inline-block">address line 01 :</label>
                            <input {...register("address1", { required: true })} type="text" id="address1" placeholder="e.g. flat number" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="address2" className="text-gray-500 font-medium text-xl mb-2 inline-block">address line 02 :</label>
                            <input {...register("address2", { required: true })} type="text" id="address2" placeholder="e.g. street name" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="city" className="text-gray-500 font-medium text-xl mb-2 inline-block">city :</label>
                            <input {...register("city", { required: true })} type="text" id="city" placeholder="e.g. stockholm" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="state" className="text-gray-500 font-medium text-xl mb-2 inline-block">state :</label>
                            <input {...register("state", { required: true })} type="text" id="state" placeholder="e.g. tumba" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                        <div className="inputField">
                            <label htmlFor="country" className="text-gray-500 font-medium text-xl mb-2 inline-block">country :</label>
                            <input {...register("country", { required: true })} type="text" id="country" placeholder="e.g. Sweden" className="border-gray-800 border-solid bg-gray-100 border-2 rounded-lg w-full p-3 text-xl text-gray-800 focus:border-green-500" />
                        </div>

                    </div>
                    <input type="submit" value="Place Order" className="py-4 w-full bg-green-600 btn__style capitalize mt-4 cursor-pointer" />
                </form>
            </div>
        </section>
    )
}
