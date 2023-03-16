const _ = require('lodash')

const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const sum = (sum, value) => {
        return sum + value.likes
    }

    return blogs.reduce(sum, 0)
}

const favoriteBlog = (blogs) => {
    let mostLikes = _.maxBy(blogs, 'likes')

    return {
        title: mostLikes.title,
        author: mostLikes.author,
        likes: mostLikes.likes
    }
}

const mostBlogs = (blogs) => {
    const blogsByAuthor = _.map(_.groupBy(blogs, 'author'), (blogList, authorName) => {
        return {
            author: authorName,
            blogs: blogList.length
        }
    })

    return _.maxBy(blogsByAuthor, 'blogs')
}

const mostLikes = (blogs) => {
    const blogsByAuthor = _.map(_.groupBy(blogs, 'author'), (blogList, authorName) => {
        return {
            author: authorName,
            likes: _.sumBy(blogList, 'likes')
        }
    })
    
    return _.maxBy(blogsByAuthor, 'likes')
}

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
}