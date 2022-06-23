import axios from 'axios'

const axiosInstance = axios.create({
    baseURL: "https://mern-grocery.herokuapp.com/api"
})

export default axiosInstance