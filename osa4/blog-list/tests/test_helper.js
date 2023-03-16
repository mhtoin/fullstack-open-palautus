const Blog = require('../models/blog')
const User = require('../models/user')
//const bcrypt = require('bcrypt')

const initialBlogs = [
    {
        _id: "5a422b891b54a676234d17fa",
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        _id: "5a422ba71b54a676234d17fb",
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 12,
        __v: 0
    },
    {
        _id: "5a422bc61b54a676234d17fc",
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 12,
        __v: 0
    }
]

const initialUsers = [
    {
        name: "Miika",
        username: "blog_miika",
        passwordHash: '$2b$10$y9u57GqifJAOJQ4G/qOQMO4WHfqj1f2elAcRDHTaKsMeJMRnWKBz2'
    },
    {
        name: "Dev",
        username: "dev_user",
        passwordHash: 'secrethash'
    }
]

const blogsInDb = async () => {
    let blogs = await Blog.find({})
    blogs = blogs.map(blog => blog.toJSON())
    return blogs
}

const usersInDb = async () => {
    let users = await User.find({})
    users = users.map(user => user.toJSON())
    return users
}

module.exports = {
    initialBlogs, initialUsers, blogsInDb, usersInDb
}