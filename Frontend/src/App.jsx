import { Route, Routes, Navigate } from "react-router-dom"
import Login from "./components/Login"
import Home from "./components/Home"
import Signup from "./components/Signup"
import { useContext } from "react"
import { UserDataContext } from "./context/UserContext"
import Settings from "./components/BlogApp/Settings"
import Feed from "./components/BlogApp/Feed"
import Blog from "./components/BlogApp/Blog"
import MyBlog from "./components/BlogApp/MyVlog"

const ProtectedRoute = ({ children }) => {
  const { user } = useContext(UserDataContext)
  const isAuthenticated = Boolean(user?.username || user?.email)

  return isAuthenticated ? children : <Navigate to="/" replace />
}

const App = () => {
  const { user, loading } = useContext(UserDataContext)
  const isAuthenticated = Boolean(user?.username || user?.email)

  if (loading) {
    return <div className="flex items-center justify-center h-screen text-xl text-slate-700">Loading...</div>
  }

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        >
          <Route index element={<Feed />} />
          <Route path="feed" element={<Feed />} />
          <Route path="blog" element={<Blog />} />
          <Route path="my-blogs" element={<MyBlog />} />
          <Route path="setting" element={<Settings />} />
        </Route>
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  )
}

export default App
