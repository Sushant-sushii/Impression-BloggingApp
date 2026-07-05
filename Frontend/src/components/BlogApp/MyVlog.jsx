import { useEffect, useState } from "react"
import axios from "axios"

const MyBlog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const loadMyFeed = async (ignore = false) => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/myblogs`, {
        withCredentials: true,
      })
      if (!ignore) {
        setBlogs(response.data.blogs || [])
      }
    } catch (e) {
      console.error("Error fetching your blogs:", e)
      if (!ignore) {
        setError("Unable to load your blogs")
      }
    } finally {
      if (!ignore) {
        setLoading(false)
      }
    }
  }

  useEffect(() => {
    let ignore = false

    const fetchData = async () => {
      await loadMyFeed(ignore)
    }

    fetchData()

    return () => {
      ignore = true
    }
  }, [])

  const handleDelete = async (blogId) => {
    const confirmed = window.confirm("Are you sure you want to delete this blog?")
    if (!confirmed) return

    try {
      await axios.delete(`${import.meta.env.VITE_BASE_URL}/blog/${blogId}`, {
        withCredentials: true,
      })
      setBlogs((prev) => prev.filter((blog) => (blog._id || blog.id) !== blogId))
    } catch (e) {
      console.error("Error deleting blog:", e)
      alert("Failed to delete blog")
    }
  }

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-4 px-4 py-6">
      <h1 className="text-2xl font-bold -mt-4 text-center font-[general] text-[#0A2184]">My Blogs</h1>

      <div className="-mt-6 blogSection flex-1 min-h-0 w-full overflow-y-auto pr-2 max-h-[calc(100vh-240px)]">
        {loading && <div className="mt-6 text-center text-sm text-slate-500">Loading your blogs...</div>}
        {error && <div className="mt-6 rounded-2xl bg-red-100 px-4 py-3 text-red-700">{error}</div>}

        {!loading && !error && blogs.length === 0 && (
          <div className="mt-6 rounded-2xl bg-white p-6 text-center text-slate-700 shadow-sm">
            You have not created any blogs yet.
          </div>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <div key={blog._id || blog.id} className="overflow-hidden rounded-3xl bg-white shadow-lg shadow-black/5">
              <div className="h-28 w-full overflow-hidden bg-slate-100">
                {blog.imageURL ? (
                  <img src={blog.imageURL} alt={blog.title} className="h-full w-full object-cover" />
                ) : (
                  <div className="flex h-full items-center justify-center text-slate-400">No image</div>
                )}
              </div>
              <div className="space-y-2 p-3">
                <div className="flex items-start justify-between gap-2">
                  <h2 className="text-sm font-semibold text-slate-900">{blog.title}</h2>
                  <button
                    onClick={() => handleDelete(blog._id || blog.id)}
                    className="rounded-full bg-red-100 px-2 py-1 text-[11px] font-medium text-red-700 hover:bg-red-200"
                  >
                    Delete
                  </button>
                </div>
                <p className="text-xs leading-5 text-slate-600">{blog.description || "No description provided."}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default MyBlog
