import { createContext, useState, useEffect } from 'react'
import axios from 'axios'

export const UserDataContext = createContext()

const UserContext = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/auth/me`, {
          withCredentials: true,
        })
        const currentUser = response.data.user
        setUser(currentUser)
      } catch (err) {
        setUser(null)
      } finally {
        setLoading(false)
      }
    }

    fetchCurrentUser()
  }, [])

  return (
    <UserDataContext.Provider value={{ user, setUser, loading }}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContext
