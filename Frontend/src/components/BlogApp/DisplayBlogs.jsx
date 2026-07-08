import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const DisplayBlogs = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [comments, setComments] = useState([])
  const [commentText, setCommentText] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [commentError, setCommentError] = useState('')
  const [posting, setPosting] = useState(false)

  useEffect(() => {
    const fetchBlogDetail = async () => {
      try {
        setLoading(true)
        const [blogResponse, commentResponse] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BASE_URL}/blog/getOne/${id}`),
          axios.get(`${import.meta.env.VITE_BASE_URL}/blog/comments/${id}`),
        ])

        setBlog(blogResponse.data.blog)
        setComments(commentResponse.data.comments || [])
      } catch (err) {
        console.error(err)
        setError('Unable to load blog details. Please try again.')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBlogDetail()
    }
  }, [id])

  const handleSubmitComment = async (e) => {
    e.preventDefault()
    setCommentError('')

    if (!commentText.trim()) {
      setCommentError('Please write a comment before posting.')
      return
    }

    try {
      setPosting(true)
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blog/comments`,
        { comment: commentText.trim(), blogId: id },
        { withCredentials: true }
      )

      setComments((prev) => [...prev, response.data.comment])
      setCommentText('')
    } catch (err) {
      console.error(err)
      setCommentError('Unable to post comment. Login and try again.')
    } finally {
      setPosting(false)
    }
  }

  if (loading) {
    return <div className="flex items-center justify-center h-full text-lg text-slate-700">Loading blog details...</div>
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="rounded-2xl bg-red-100 p-6 text-red-700">{error}</div>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mt-4 rounded-xl bg-[#0A2184] px-5 py-3 text-white hover:bg-[#091a4a]"
        >
          Back
        </button>
      </div>
    )
  }

  if (!blog) {
    return <div className="p-6 text-slate-700">Blog not found.</div>
  }

  return (
    <div className="space-y-6 p-6">
      <button
        type="button"
        onClick={() => navigate(-1)}
        className="rounded-xl bg-[#0A2184] px-4 py-2 text-sm font-semibold text-white hover:bg-[#091a4a]"
      >
        Back to feed
      </button>

      <div className="rounded-3xl bg-white p-6 shadow-lg shadow-black/5">
        {blog.imageURL ? (
          <img src={blog.imageURL} alt={blog.title} className="h-72 w-full rounded-3xl object-cover" />
        ) : (
          <div className="flex h-72 items-center justify-center rounded-3xl bg-slate-100 text-slate-500">
            No image available
          </div>
        )}

        <div className="mt-6 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h1 className="text-3xl font-bold text-slate-900">{blog.title}</h1>
            <span className="rounded-full bg-[#E1790D]/10 px-3 py-1 text-sm font-semibold text-[#E1790D]">
              {blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown'}
            </span>
          </div>

          <div className="rounded-2xl bg-slate-50 p-4 text-sm text-slate-700">
            <div className="font-semibold text-slate-900">Author</div>
            <div>{blog.createdBy?.username || 'Unknown author'}</div>
          </div>

          <p className="text-base leading-8 text-slate-700">{blog.description}</p>
        </div>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Comments</h2>
          <span className="text-sm text-slate-500">{comments.length} total</span>
        </div>

        <div className="space-y-4">
          {comments.length === 0 ? (
            <div className="rounded-3xl bg-slate-50 p-6 text-slate-600">No comments yet. Be the first to share your thoughts.</div>
          ) : (
            comments.map((comment) => (
              <div key={comment._id} className="rounded-3xl bg-white p-5 shadow-sm shadow-black/5">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-900">{comment.createdBy?.username || 'Anonymous'}</p>
                  <span className="text-xs text-slate-500">{comment.createdAt ? new Date(comment.createdAt).toLocaleString() : ''}</span>
                </div>
                <p className="mt-3 text-slate-700">{comment.comment}</p>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="rounded-3xl bg-white p-6 shadow-lg shadow-black/5">
        <h3 className="text-xl font-semibold text-slate-900">Post a comment</h3>
        <form onSubmit={handleSubmitComment} className="mt-4 space-y-4">
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            rows={4}
            placeholder="Share your thoughts on this blog..."
            className="w-full rounded-3xl border border-slate-200 bg-slate-50 p-4 text-slate-900 outline-none focus:border-[#E1790D] focus:ring-2 focus:ring-[#E1790D]/20"
          />
          {commentError && <div className="text-sm text-red-600">{commentError}</div>}
          <button
            type="submit"
            disabled={posting}
            className="inline-flex items-center justify-center rounded-3xl bg-[#E1790D] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#c16709] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {posting ? 'Posting...' : 'Post Comment'}
          </button>
        </form>
      </section>
    </div>
  )
}

export default DisplayBlogs
