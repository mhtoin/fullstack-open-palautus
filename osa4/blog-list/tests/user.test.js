const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
    await User.deleteMany({})
    const users = helper.initialUsers.map(user => new User(user))
    await Promise.all(users.map(user => user.save()))
})

test('user with too short a password is not created', async () => {
    let userObject = {
        username: 'test_user',
        name: 'Test',
        password: 'se'
    }

    await api.post('/api/users').send(userObject).expect(400)
    let usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
})

test('user with too short a username is not created', async () => {
    let userObject = {
        username: 'te',
        name: 'Test',
        password: 'secret'
    }

    await api.post('/api/users').send(userObject).expect(400)
    let usersAfter = await helper.usersInDb()
    expect(usersAfter).toHaveLength(helper.initialUsers.length)
})

test('user with username that already exists in db is not created', async() => {
    let userObject = {
        username: 'dev_user',
        name: 'Devaaja',
        password: 'secret'
    }

    let res = await api.post('/api/users').send(userObject).expect(400)
})

afterAll(async () => {
    await mongoose.connection.close()
  })

