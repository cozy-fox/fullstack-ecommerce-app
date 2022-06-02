import jwt from 'jsonwebtoken'

export function verifyToken(req, res) {
    const token = req.cookies.access_token
    const clientData = req.cookies.clientData

    if (!token || !clientData) {
        res.status(401)
        throw new Error('You are not authenticated')
    }

    const user = jwt.verify(token, process.env.JWT_SECRET)
    if (!user) {
        res.status(403)
        throw new Error('Invalid token')
    }

    req.user = user
}

export function verifyUser(req, res, next) {
    const { id } = req.params
    verifyToken(req, res)
    if (req.user.id === id || req.user.isAdmin) {
        next()
    } else {
        res.status(403)
        throw new Error('You are not authorized')
    }
}

export function verifyAdmin(req, res, next) {
    verifyToken(req, res)
    if (req.user.isAdmin) {
        next()
    } else {
        res.status(403)
        throw new Error('You are not authorized')
    }
}