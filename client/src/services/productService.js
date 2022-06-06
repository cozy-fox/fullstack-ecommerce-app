import axios from 'axios'

async function allProducts(url) {
    const res = await axios.get(url)
    return res.data
}

const productService = { allProducts }

export default productService