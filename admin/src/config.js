import axios from 'axios'

const axiosInstance = axios.create({
    baseUrl: "https://mern-grocery.herokuapp.com/api/"
})

export default axiosInstance