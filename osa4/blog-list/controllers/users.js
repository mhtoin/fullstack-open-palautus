const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response, next) => {
    try {
        const users = await User.find({}).populate('blogs', {author: 1, url: 1, title: 1, likes: 1})
        response.json(users)
    } catch (e) {
        next(e)
    }
})

usersRouter.post('/', async (request, response, next) => {
    const { username, name, password } = request.body

    if (password.length < 3) {
        console.log('too short')
        return response.status(400).json({ error: 'Password must be at least 3 charactes long' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
        username,
        name,
        passwordHash,
    })

    try {
        const savedUser = await user.save()
        response.status(201).json(savedUser)
    } catch (e) {
        next(e)
    }
  
})

module.exports = usersRouter