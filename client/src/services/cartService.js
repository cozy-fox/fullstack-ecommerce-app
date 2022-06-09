import axios from 'axios'

async function addInCart(url, data) {
    const res = await axios.post(url, data)
    return res.data
}

async function allItems(url) {
    const res = await axios.get(url)
    return res.data
}


const cartService = { addInCart, allItems }
export default cartService