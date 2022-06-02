import axios from 'axios'

async function loginService(userData) {
    const { email, pass } = userData
    const res = await axios.post('/auth/login', { email, pass })
    return res.data
}

async function logoutService() {
    const res = await axios.get('/auth/logout')
    return res.data.message
}

const authService = { loginService, logoutService }

export default authService