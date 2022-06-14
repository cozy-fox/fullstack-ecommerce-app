import axios from 'axios'


//order services

async function orders(url) {
    const res = await axios.get(url)
    return res.data
}

//order services

const services = { orders }
export default services