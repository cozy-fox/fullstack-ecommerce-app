import axios from "axios"

const axiosInstance = axios.create({
  // baseUrl: "https://mern-grocery.herokuapp.com/api/"
  baseURL: "http://localhost:5000/api/",
  withCredentials: true,
})

export default axiosInstance
