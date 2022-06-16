import axios from 'axios'

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

const services = { orders, loginService, logoutService, updateUser, updateOrder, deleteOrder, allUsers, deleteUser, getMessages, deleteMessage }
export default services