import axios from 'axios'
import uploadImage from './utils/uploadImg'
import deleteImage from './utils/deleteImg'
import { v1 } from 'uuid'

//order services
async function orders(url) {
    const res = await axios.get(url)
    return res.data
}

async function updateOrder(url, data) {
    const res = await axios.put(url, data)
    return res.data
}

async function deleteOrder(url) {
    const res = await axios.delete(url)
    return res.data
}
//order services


//auth services
async function loginService(userData) {
    const { email, pass } = userData
    const res = await axios.post('/auth/adminLogin', { email, pass })
    return res.data
}

async function logoutService() {
    const res = await axios.get('/auth/logout')
    return res.data.message
}

async function updateUser(url, userData) {
    const res = await axios.put(url, userData)
    return res.data
}
//auth services


//user services
async function allUsers(url) {
    const res = await axios.get(url)
    return res.data
}

async function deleteUser(url) {
    const res = await axios.delete(url)
    return res.data
}
//user services


//message services
async function getMessages(url) {
    const res = await axios.get(url)
    return res.data
}

async function deleteMessage(url) {
    const res = await axios.delete(url)
    return res.data
}
//message services


//product services
async function allProducts(url) {
    const res = await axios.get(url)
    return res.data
}

async function createProduct(url, data) {
    const imageName = v1()
    const imgUrl = await uploadImage(data.productImage[0], imageName)

    const res = await axios.post(url, { ...data, imageName, productImage: imgUrl })
    return res.data
}

async function removeProduct(url, imageLocation) {
    await deleteImage(imageLocation)
    const res = await axios.delete(url)
    return res.data
}
//product services


//category services
async function allCategories(url) {
    const res = await axios.get(url)
    return res.data
}
//category services

const services = {
    orders,
    loginService,
    logoutService,
    updateUser,
    updateOrder,
    deleteOrder,
    allUsers,
    deleteUser,
    getMessages,
    deleteMessage,
    allProducts,
    allCategories,
    createProduct,
    removeProduct
}
export default services