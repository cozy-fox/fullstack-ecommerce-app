import axios from 'axios'

async function wishlist(url) {
    const res = await axios.get(url)
    return res.data
}

const wishService = { wishlist }
export default wishService