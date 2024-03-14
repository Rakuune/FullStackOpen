const dummy = (blogs) => {
    return 1
  }

  const totalLikes = (blogs) => {
    if (blogs.length === 0) {
      return 0
    } else if (blogs.length === 1) {
      return blogs[0].likes
    } else {
      return blogs.reduce((sum, blog) => sum + blog.likes, 0)
    }
  }

  const favoriteBlog = (blogs) => {
    const reducer = (last, now) => {
      return last.likes > now.likes ? last : now
    }
    return blogs.length === 0 ? undefined : blogs.reduce(reducer)
  }

  const mostBlogs = (blogs) => {
    const authors = blogs.map(blog => blog.author)
    const author = authors.reduce((last, now) => {
      last[now] = (last[now] || 0) + 1
      return last
    }, {})
    const authorArray = Object.entries(author)
    const reducer = (last, now) => {
      return last[1] > now[1] ? last : now
    }
    const result = authorArray.reduce(reducer,[undefined, 0])
    return { author: result[0], blogs: result[1] }
  }

  const mostLikes = (blogs) => {
    const reducer = (last, now) => {
      last[now.author] = (last[now.author] || 0) + now.likes
      return last
    }
    const result = blogs.reduce(reducer, {})
    const authorArray = Object.entries(result)
    const reducer2 = (last, now) => {
      return last[1] > now[1] ? last : now
    }
    const result2 = authorArray.reduce(reducer2,[undefined, 0])
    return { author: result2[0], likes: result2[1] }
  }
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes,
  }