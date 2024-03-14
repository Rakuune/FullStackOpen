const assert = require('assert')
const listHelper = require('../utils/list_helper')

test('dummy returns one', () => {
    const blogs = []
  
    const result = listHelper.dummy(blogs)
    assert.strictEqual(result, 1)
  })

  describe('total likes', () => {
    const listWithOneBlog = [
      {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
        likes: 5,
        __v: 0
      }
    ]
  
    test('when list has only one blog, equals the likes of that', () => {
      const result = listHelper.totalLikes(listWithOneBlog)
      assert.strictEqual(result, 5)
    })
  })

  describe('mostBlogs', () => {
    test('finds the author with the most blogs', () => {
      const blogs = [
        { author: 'Author1', title: 'Title1' },
        { author: 'Author2', title: 'Title2' },
        { author: 'Author1', title: 'Title3' }
      ]
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'Author1', blogs: 2 })
    })
  
    test('returns one author in case of a tie', () => {
      const blogs = [
        { author: 'Author1', title: 'Title1' },
        { author: 'Author2', title: 'Title2' }
      ]
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'Author2', blogs: 1 })
    })
  
    test('handles an empty array', () => {
      const blogs = []
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: undefined, blogs: 0 })
    })
  
    test('handles an array with one blog', () => {
      const blogs = [{ author: 'Author1', title: 'Title1' }]
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'Author1', blogs: 1 })
    })
  
    test('handles multiple blogs with multiple authors correctly', () => {
      const blogs = [
        { author: 'Author1', title: 'Title1' },
        { author: 'Author2', title: 'Title2' },
        { author: 'Author3', title: 'Title3' },
        { author: 'Author2', title: 'Title4' },
        { author: 'Author2', title: 'Title5' }
      ]
      const result = listHelper.mostBlogs(blogs)
      expect(result).toEqual({ author: 'Author2', blogs: 3 })
    })
  })

  describe('favoriteBlog', () => {
    test('returns the blog with the highest number of likes', () => {
      const blogs = [
        { title: 'Blog1', likes: 10 },
        { title: 'Blog2', likes: 15 },
        { title: 'Blog3', likes: 5 }
      ]
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({ title: 'Blog2', likes: 15 })
    })
  
    test('returns undefined for an empty array', () => {
      const blogs = []
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toBeUndefined()
    })
  
    test('works with a single blog', () => {
      const blogs = [{ title: 'Blog1', likes: 10 }]
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({ title: 'Blog1', likes: 10 })
    })
  
    test('returns one found blog in case of a tie', () => {
      const blogs = [
        { title: 'Blog1', likes: 10 },
        { title: 'Blog2', likes: 15 },
        { title: 'Blog3', likes: 15 }
      ]
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({ title: 'Blog3', likes: 15 })
    })
  
    test('handles blogs with negative likes', () => {
      const blogs = [
        { title: 'Blog1', likes: -10 },
        { title: 'Blog2', likes: -15 }
      ]
      const result = listHelper.favoriteBlog(blogs)
      expect(result).toEqual({ title: 'Blog1', likes: -10 })
    })
  })

  describe('mostLikes', () => {
    test('returns the author with the highest total likes', () => {
      const blogs = [
        { author: 'Author1', likes: 10 },
        { author: 'Author2', likes: 20 },
        { author: 'Author1', likes: 15 }
      ]
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'Author1', likes: 25 })
    })
  
    test('handles an empty array', () => {
      const blogs = []
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: undefined, likes: 0})
    })
  
    test('works with a single blog', () => {
      const blogs = [{ author: 'Author1', likes: 10 }]
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'Author1', likes: 10 })
    })
  
    test('returns one author in case of a tie in total likes', () => {
      const blogs = [
        { author: 'Author1', likes: 25 },
        { author: 'Author2', likes: 15 },
        { author: 'Author2', likes: 10 }
      ]
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'Author2', likes: 25 })
    })
  
    test('correctly aggregates likes for multiple blogs by the same author', () => {
      const blogs = [
        { author: 'Author1', likes: 10 },
        { author: 'Author1', likes: 15 },
        { author: 'Author2', likes: 20 },
        { author: 'Author2', likes: 5 }
      ]
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'Author2', likes: 25 })
    })
  
    test('handles blogs with no likes', () => {
      const blogs = [
        { author: 'Author1', likes: 0 },
        { author: 'Author2', likes: 0 }
      ]
      const result = listHelper.mostLikes(blogs)
      expect(result).toEqual({ author: 'Author2', likes: 0 }) 
    })
  })
  
  