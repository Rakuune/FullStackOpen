const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const api = supertest(app)

describe('Blog list tests', () => {
  test('blogs are returned as json and correct amount', async () => {
    const initialBlogs = await Blog.find({})
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body).toHaveLength(initialBlogs.length)
  })
  test('unique identifier property of the blog posts is named id', async () => {
    const response = await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(response.body[0].id).toBeDefined()
    expect(response.body[0]._id).toBeUndefined()
  })
  test('successfully creates a new blog post and increases the count by one', async () => {
    const initialBlogs = await Blog.find({})
    const newBlog = {
      title: 'Testing in JavaScript',
      author: 'Jane Doe',
      url: 'example23.com',
      likes: 76
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAfterPost = await Blog.find({})
    expect(blogsAfterPost).toHaveLength(initialBlogs.length + 1)

    const blogExists = blogsAfterPost.some(blog => 
      blog.title === newBlog.title && 
      blog.author === newBlog.author &&
      blog.likes === newBlog.likes &&
      blog.url === newBlog.url
    )
    expect(blogExists).toBe(true)
  })
})
afterAll(async () => {
  await mongoose.connection.close()
})