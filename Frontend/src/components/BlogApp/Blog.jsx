import { useState } from "react";
import axios  from "axios";
import { useNavigate } from "react-router-dom";




const Blog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);

  

  const navigate=useNavigate();

  


  const submitHandler=async (e)=>{
    e.preventDefault();

    if (!title.trim() || !description.trim() || !imageFile) {
      alert("Please provide a title, description, and image.")
      return
    }

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("image", imageFile)

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/blog/create`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )

      if (response.status === 201) {
        console.log(response.data)
        alert("Blog created Successfully");
        navigate("/home/feed")
      }
    } catch (e) {
      alert("Publish Unsuccessful")
      console.error(e)
    }

    
  }


  return (
    <>
      <h1 className="text-2xl font-bold -mt-4 text-center font-[general] text-[#0A2184]">
        What's in your mind?
      </h1>

      <div className="flex translate-y-9 h-full min-h-0 w-full flex-col gap-4 px-10  py- font-[general]">
        <div className="-mt-6 blogSection flex-1 min-h-0 w-full overflow-y-auto pr-2 max-h-[calc(100vh-240px)]">
          <div className="form mx-auto max-w-3xl bg-white rounded-2xl shadow-lg ">
            <div className="p-6 rounded-xl bg-blue-300/10">
              <form
              onSubmit={(e)=>{
                submitHandler(e);
              }}
              className="space-y-6">
            <div>
       {/* title */}
              <label className="block pl-1 mb-2 text-sm font-semibold text-black">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e)=>{
                  setTitle(e.target.value)
                                   
                }}
                placeholder="Enter blog title"
                className="w-full rounded-xl border border-blue-900 px-4 py-3 text-gray-800 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
{/* desc */}
            <div>
              <label className="block pl-1 mb-2 text-sm font-semibold text-black">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e)=>{
                  setDescription(e.target.value)
                                   
                }}
                placeholder="Write your description here"
                className="w-full rounded-xl border border-blue-900 px-4 py-3 text-gray-800 min-h-[140px] resize-none outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/30"
              />
            </div>
{/* upload img */}
            <div>
              <label className="block pl-1 mb-2 text-sm font-semibold text-black">
                Upload image (PNG or JPG)
              </label>
              <input
                type="file"
                onChange={(e)=>{
                  const file = e.target.files?.[0]
                  if (file) {
                    setImageFile(file)
                  }
                }}
                accept="image/png,image/jpeg"
                className="w-full rounded-xl border border-blue-900 bg-white px-4 py-3 text-sm text-gray-700 file:mr-4 file:rounded-lg file:border-0 file:bg-[#E1790D] file:px-4 file:py-2 file:text-white file:font-semibold file:cursor-pointer"
              />
            </div>
{/* publish button */}
            <div className="pt-3">
              <button
                type="submit"
                className="w-full rounded-xl bg-[#E1790D] px-5 py-3 text-white font-semibold shadow-sm shadow-[#E1790D]/30 transition hover:bg-[#c16709]"
              >
                Publish
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</>
  )
}

export default Blog
