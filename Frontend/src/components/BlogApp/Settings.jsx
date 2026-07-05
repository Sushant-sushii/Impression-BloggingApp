import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { RiLogoutBoxRLine } from '@remixicon/react'

const Settings = () => {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/api/auth/logout`, {}, {
        withCredentials: true,
      })
      navigate('/')
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      navigate('/')
    }
  }

  return (
    <div className="flex min-h-full items-center justify-center p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-lg shadow-black/10">
        <h2 className="text-2xl font-bold text-[#0A2184]">Settings</h2>
        <p className="mt-2 text-sm text-slate-600">Manage your account preferences here.</p>

        <button
          onClick={handleLogout}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600"
        >
          <RiLogoutBoxRLine size={18} />
          Logout
        </button>
      </div>
    </div>
  )
}

export default Settings
