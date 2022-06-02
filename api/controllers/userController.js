import asyncHandler from 'express-async-handler'

// @desc   update user
// @route  PUT api/user/:id
// @access Private
export const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.params
    res.send(id)
})