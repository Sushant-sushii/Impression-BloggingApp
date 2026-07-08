import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

const Feed = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/blog/getAll`)
        setBlogs(response.data.blogs || [])
      } catch (err) {
        console.error("Error fetching blogs:", err)
        setError("Unable to load blogs")
      } finally {
        setLoading(false)
      }
    }

    fetchBlogs()
  }, [])

  const navigate = useNavigate()

  return (
    <>
      <h1 className="text-2xl font-bold -mt-4 text-center font-[general] text-[#0A2184]">Blogs</h1>
      <div className="flex h-full min-h-0 w-full flex-col gap-4 px-4 py-6">

        {loading && (
          <div className="text-center text-sm text-slate-500">Loading blogs...</div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-100 px-4 py-3 text-red-700">{error}</div>
        )}

        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-2xl bg-white p-6 text-center text-slate-700 shadow-sm">
            No blogs available yet.
          </div>
        )}

        <div className="-mt-6 blogSection flex-1 min-h-0 w-full overflow-y-auto pr-2 max-h-[calc(100vh-240px)]">
          <div className="grid min-h-full w-full gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {blogs.map((blog) => {
              const createdAt = blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : "Unknown"
              return (
                <div
                  key={blog.id || blog._id}
                  onClick={() => navigate(`/display-blogs/${blog._id}`)}
                  className="cursor-pointer overflow-hidden rounded-3xl bg-white shadow-lg shadow-black/5 transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="h-28 w-full overflow-hidden bg-slate-100">
                    {blog.imageURL ? (
                      <img
                        src={blog.imageURL}
                        alt={blog.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-slate-400">No image</div>
                    )}
                  </div>
                  <div className="space-y-2 p-3">
                    <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                      <h2 className="text-sm font-semibold text-slate-900 line-clamp-2">{blog.title}</h2>
                      <span className="rounded-full bg-[#E1790D]/10 px-2 py-1 text-[10px] font-medium text-[#E1790D]">{createdAt}</span>
                    </div>
                    <p className="text-xs leading-5 text-slate-600 line-clamp-2">{blog.description || "No description provided."}</p>
                    <div className="rounded-2xl bg-slate-50 p-3 text-xs text-slate-700">
                      <div>
                        <span className="font-semibold">Author:</span> {blog.createdBy?.username || "Unknown"}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Feed
