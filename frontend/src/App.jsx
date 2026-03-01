import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

function App() {
  const [posts, setPosts] = useState([])
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // 获取文章列表
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/posts')
        setPosts(response.data)
        setLoading(false)
      } catch (err) {
        setError('Failed to fetch posts')
        setLoading(false)
        console.error(err)
      }
    }

    fetchPosts()
  }, [])

  // 创建新文章
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post('http://localhost:8000/api/v1/posts', {
        title,
        content,
        published: true
      })
      setPosts([...posts, response.data])
      setTitle('')
      setContent('')
    } catch (err) {
      setError('Failed to create post')
      console.error(err)
    }
  }

  if (loading) {
    return <div className="container">Loading...</div>
  }

  if (error) {
    return <div className="container">Error: {error}</div>
  }

  return (
    <div className="container">
      <h1>Blog Posts</h1>
      
      {/* 创建文章表单 */}
      <div className="form-container">
        <h2>Create New Post</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              rows={4}
            ></textarea>
          </div>
          <button type="submit" className="btn">Create Post</button>
        </form>
      </div>

      {/* 文章列表 */}
      <div className="posts-container">
        <h2>Posts List</h2>
        {posts.length === 0 ? (
          <p>No posts yet. Create your first post!</p>
        ) : (
          <ul className="posts-list">
            {posts.map((post) => (
              <li key={post.id} className="post-item">
                <h3>{post.title}</h3>
                <p>{post.content.substring(0, 100)}...</p>
                <small>Created at: {new Date(post.created_at).toLocaleString()}</small>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default App