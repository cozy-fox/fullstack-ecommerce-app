import asyncHandler from 'express-async-handler'
import Category from '../models/categoryModel.js'

// @desc   get all categories
// @route  GET api/category/
// @access Public
export const getCategories = asyncHandler(async (req, res) => {
    res.send('hello from category controller')
})

// @desc   create a category
// @route  POST api/category/create
// @access Private
export const createCategory = asyncHandler(async (req, res) => {
    const { title, description, image } = req.body
    let cat = new Category({ title, image })
    if (description) {
        cat.description = description
    }
    cat = await cat.save()
    res.send(cat)
})