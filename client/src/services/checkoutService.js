import axios from 'axios'

async function checkout(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

const checkoutService = { checkout }
export default checkoutService