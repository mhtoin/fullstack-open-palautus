const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const _ = require('lodash')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogs = helper.initialBlogs.map(blog => new Blog(blog))
    await Promise.all(blogs.map(blog => blog.save()))
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('correct amount of blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('unique identifier is named id instead of _id', async () => {
    const blogs = await helper.blogsInDb()
    blogs.forEach(blog => {
        console.log(blog)
        expect(blog.id).toBeDefined()
    })
})


describe('Blog creation and deletion', () => {
    var token = ''
    var user = ''

    beforeAll(async () => {
        await User.deleteMany({})
        let userObject = await api.post('/api/users').send({ username: 'tester', name: 'Testeri', password: 'secret' })
        loginRes = await api.post('/api/login').send({ username: 'tester', password: 'secret' })
        user = userObject.body.id
        token = loginRes.body.token
        console.log('user', user.body)
    })

    test('blog is saved correctly', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            user: user.toString()
        }

        /**
         * Blog creation requires a valid jwt token
         */
        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
        const blogsWithoutId = blogsAtEnd.map(blog => {
            blog = _.omit(blog, 'id')
            if (blog.user) {
                blog.user = blog.user.toString()
            }
            return blog
        })
        expect(blogsWithoutId).toContainEqual(newBlog)
    }, 100000)

    test('adding a new blog without valid token returns unauthorized', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            user: user.toString()
        }

        console.log('sending new blog without token')
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })

    test('missing likes property defaults to zero on creation', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        let insertedBlog = await api.post('/api/blogs').set('Authorization', 'Bearer ' + token).send(newBlog)
        expect(insertedBlog.body.likes).toBe(0)
    })

    test('missing title results in 400', async () => {
        const newBlog = {
            //title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(400)
    })

    test('missing url results in 400', async () => {
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            //url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)
            .expect(400)
    })

    test('deleting blog with valid id succeeds', async () => {
        const startingBlogs = await helper.blogsInDb()
        const newBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
            likes: 5,
            user: user.toString()
        }
        startingBlogs.push(newBlog)

        /**
         * Since blog deletion is only allowed for the user who created it
         * easiest to just create a blog with the test user and then delete
         */

        let insertedBlog = await api
            .post('/api/blogs')
            .set('Authorization', 'Bearer ' + token)
            .send(newBlog)


        await api
            .delete(`/api/blogs/${insertedBlog.body.id}`)
            .set('Authorization', 'Bearer ' + token)
            .expect(204)

        const blogsAfterDeletion = await helper.blogsInDb()
        const ids = blogsAfterDeletion.map(blog => blog.id)

        expect(blogsAfterDeletion).toHaveLength(startingBlogs.length - 1)
        expect(ids).not.toContain(insertedBlog.body.id)
    })
})


test('updating a post with valid if succeeds', async () => {
    const startingBlogs = await helper.blogsInDb()
    const blogToUpdate = startingBlogs[0]
    const updatedData = {
        likes: 30
    }

    const updatedBlog = await api.put(`/api/blogs/${blogToUpdate.id}`).send(updatedData).expect(200)

    expect(updatedBlog.body.likes).toBe(30)
})


afterAll(async () => {
    await mongoose.connection.close()
})